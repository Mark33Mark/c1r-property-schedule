import React, { useState, useEffect, useCallback } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { useGetPropertiesQuery } from '../../store/slices';
import { Mapped } from './Mapped';
import { SearchAutoComplete } from './SearchAutoComplete';
import { useTitle } from '../../hooks';
import { constants } from '../../config';
import {
	differenceInDatesDetailed,
	differenceInDatesPast,
	extractOptionArray,
	countOptionArray,
} from '../../utils';
import { CloseButton, PropertySearch } from '../../assets';
import PulseLoader from 'react-spinners/PulseLoader';
import secureLocalStorage from 'react-secure-storage';

export const Property = () => {
	const [selection, setSelection] = useState({});

	useTitle('CSR: Properties');

	// RTK Query already polled query when user logged in,
	// handled in <Prefetch /> component
	const { properties } = useGetPropertiesQuery('propertiesList', {
		selectFromResult: ({ data }) => ({
			properties: data,
		}),
	});

	// if (isLoading) content = <PulseLoader color={'#FFF'} />;

	// if (isError) {
	// 	content = <p className='errmsg'>{error?.data?.message}</p>;
	// };

	const cachedPropertyList = secureLocalStorage.getItem('selectedProperty');

	let cardContent;
	let deserializedContent;

	if (properties || cachedPropertyList ) {
		const { ids, entities } = properties || cachedPropertyList;

		// 1. remove the id serialization by RTK's createEntityAdapter
		// 2. reformat object to former structure, so as not to refactor the card
		deserializedContent =
			ids?.length &&
			ids.map((propertyId) => {
				const noSerialization = entities[propertyId];
				return {
					id: noSerialization.id,
					business: noSerialization.properties.business,
					contract: noSerialization.properties.contract,
					holding: noSerialization.properties.holding,
					address: {
						lon: noSerialization.geometry.coordinates[0],
						lat: noSerialization.geometry.coordinates[1],
						...noSerialization.properties.address,
					},
					lease: { ...noSerialization.properties.lease },
					freehold: { ...noSerialization.properties.freehold },
				};
			});
	}

	// handle for persisting selected property.
	useEffect(() => {
		if (
			Object.keys(selection).length === 0 &&
			secureLocalStorage.getItem('selectedProperty')
		) {
			setSelection(secureLocalStorage.getItem('selectedProperty'));
		}
	}, []);

	// const handleOnSelect = (item) => {
	// 	setSelection(item);
	// 	secureLocalStorage.setItem('selectedProperty', item);
	// };

	const handleSelection = useCallback(
		(item) => {
			setSelection(item);
			secureLocalStorage.setItem('selectedProperty', item);
		},
		[selection]
	);

	const handleCloseCard = () => {
		setSelection({});
		secureLocalStorage.removeItem('selectedProperty');
	};

	const { locale, dateOnlyFormatShort, audCurrencyFormat } = constants[0];

	// console.log('selection = ', selection);

	if (Object.keys(selection).length !== 0) {
		cardContent = (
			<div className='property__display-card'>
				<APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
					<div className='map__container'>
						<button
							className='button__close-button'
							onClick={handleCloseCard}
							type='button'
							title='close card'
						>
							<CloseButton className='icon__close-button-image' />
						</button>
						{/* <Mapped className='map__image' lat = {null} lon = {null } /> */}
						<Mapped
							className='map__image'
							lat={selection?.address?.lat}
							lon={selection?.address?.lon}
						/>
						{/* <MapAustAndNz className='map__image' /> */}
					</div>
				</APIProvider>
				<div className='property__address'>
					<p className='property__card-contents'>{selection.address?.street}</p>
					<p className='property__card-contents'>{selection.address?.suburb}</p>
					<p className='property__card-contents'>{selection.address?.state}</p>
				</div>
				<br />
				{selection?.holding === 'leasehold' ? (
					<div className='table-container__property'>
						<table className='table--property'>
							<tbody className='table--property__body'>
								<tr className='table--property__row'>
									<th
										className='table--property__th'
										colSpan={1}
									>
										{selection?.business.toUpperCase()}
									</th>
									<th
										className='table--property__th'
										colSpan={1}
									>
										{selection?.contract}
									</th>
									<th
										className='table--property__th'
										colSpan={1}
									>
										{selection?.lease.status}
									</th>
									<th
										className='table--property__th'
										colSpan={2}
									>
										<b>plant #: </b>
										{selection?.lease?.plantID
											? selection?.lease?.plantID
											: 'not allocated'}
									</th>
								</tr>
								<tr className='table--property__row'>
									<th
										className='table--property__th'
										colSpan={1}
									>
										ends:
									</th>
									<td
										className='table--property__cell'
										colSpan={4}
									>
										{differenceInDatesDetailed(
											new Date(selection?.lease?.current?.end)
										)}{' '}
										until lease expires
									</td>
								</tr>
								<tr className='table--property__row'>
									<th
										className='table--property__th'
										colSpan={1}
									>
										commenced:
									</th>
									<td
										className='table--property__cell'
										colSpan={4}
									>
										{differenceInDatesPast(
											new Date(selection?.lease?.current?.start)
										)}
									</td>
								</tr>
								<tr className='table--property__row'>
									<th
										className='table--property__th'
										colSpan={1}
									>
										original started:
									</th>
									<td
										className='table--property__cell'
										colSpan={4}
									>
										{new Date(
											selection?.lease?.original?.start
										).toLocaleDateString(locale, dateOnlyFormatShort)}{' '}
									</td>
								</tr>
								<tr className='table--property__row'>
									<th
										className='table--property__th'
										colSpan={1}
									>
										options:
									</th>
									<td
										className='table--property__cell'
										colSpan={1}
									>
										{countOptionArray(selection?.lease?.options?.available)}
									</td>
									{countOptionArray(selection?.lease?.options?.available) ? (
										<td
											className='table--property__cell'
											colSpan={3}
										>
											{extractOptionArray(selection?.lease?.options?.available)}{' '}
										</td>
									) : (
										<td
											className='table--property__cell'
											colSpan={3}
										>
											{' '}
										</td>
									)}
								</tr>

								<tr className='table--property__row'>
									<th
										className='table--property__th'
										colSpan={1}
									>
										exercise before:
									</th>
									{countOptionArray(selection?.lease?.options?.available) ===
									'nil  ' ? (
										<td
											className='table--property__cell'
											colSpan={4}
										>
											nil
										</td>
									) : (
										<td
											className='table--property__cell'
											colSpan={4}
										>
											{differenceInDatesDetailed(
												new Date(selection.lease?.options?.exercise)
											)}
										</td>
									)}
								</tr>

								<tr className='table--property__row'>
									<th
										className='table--property__th'
										colSpan={1}
									>
										metrics:
									</th>
									<td
										className='table--property__cell'
										colSpan={2}
									>
										{selection?.lease?.GLA
											? new Intl.NumberFormat(locale, {
													style: 'decimal',
											  }).format(selection?.lease?.GLA) + 'm² GLA'
											: 'no GLA'}
									</td>
									<td
										className='table--property__cell'
										colSpan={2}
									>
										{selection?.lease?.type?.toUpperCase()}
									</td>
								</tr>
								<tr className='table--property__row'>
									<th
										className='table--property__th'
										colSpan={1}
									>
										rent (primary):
									</th>
									<td
										className='table--property__cell'
										colSpan={2}
									>
										{new Intl.NumberFormat(locale, audCurrencyFormat).format(
											selection?.lease?.rent.primary
										)}
									</td>
									<td
										className='table--property__cell'
										colSpan={2}
									>
										{selection?.lease?.GLA
											? new Intl.NumberFormat(locale, audCurrencyFormat).format(
													selection?.lease?.rent.primary / selection?.lease?.GLA
											  ) + '/m²'
											: null}
									</td>
								</tr>

								{selection?.lease?.rent?.secondary &&
								selection?.lease?.rent?.secondary > 0 ? (
									<tr className='table--property__row'>
										<th
											className='table--property__th'
											colSpan={1}
										>
											rent (secondary):
										</th>
										<td
											className='table--property__cell'
											colSpan={4}
										>
											{new Intl.NumberFormat(locale, audCurrencyFormat).format(
												selection?.lease?.rent.secondary
											)}
										</td>
									</tr>
								) : null}

								{selection?.lease?.rent?.abatement &&
								selection?.lease?.rent?.abatement > 0 ? (
									<tr className='table--property__row'>
										<th
											className='table--property__th'
											colSpan={1}
										>
											rent (abatement):
										</th>
										<td
											className='table--property__cell'
											colSpan={2}
										>
											{new Intl.NumberFormat(locale, audCurrencyFormat).format(
												selection?.lease?.rent?.abatement
											)}
										</td>
										<td
											className='table--property__cell'
											colSpan={2}
										>
											{selection?.lease?.GLA
												? new Intl.NumberFormat(
														locale,
														audCurrencyFormat
												  ).format(
														selection?.lease?.rent?.abatement /
															selection?.lease?.GLA
												  ) + '/m²'
												: null}
										</td>
									</tr>
								) : null}

								<tr className='table--property__row'>
									<th
										className='table--property__th'
										colSpan={1}
									>
										outgoings:
									</th>
									{selection?.lease?.outgoings &&
									selection?.lease?.outgoings > 0 ? (
										<>
											<td
												className='table--property__cell'
												colSpan={2}
											>
												{new Intl.NumberFormat(
													locale,
													audCurrencyFormat
												).format(parseFloat(selection?.lease?.outgoings))}
											</td>
											<td
												className='table--property__cell'
												colSpan={2}
											>
												{selection?.lease?.GLA
													? new Intl.NumberFormat(
															locale,
															audCurrencyFormat
													  ).format(
															parseFloat(selection?.lease?.outgoings) /
																selection?.lease?.GLA
													  ) + '/m²'
													: null}
											</td>
										</>
									) : (
										<td
											className='table--property__cell'
											colSpan={4}
										>
											{' '}
											outgoings unavailable{' '}
										</td>
									)}
								</tr>
								<tr className='table--property__row'>
									<th
										className='table--property__th'
										colSpan={1}
									>
										reviews:
									</th>
									<td
										className='table--property__cell'
										colSpan={2}
									>
										{selection?.lease?.review?.method
											? selection?.lease?.review?.method
											: null}
									</td>
									<td
										className='table--property__cell'
										colSpan={2}
									>
										{selection?.lease?.review?.date
											? differenceInDatesDetailed(
													new Date(selection?.lease?.review?.date)
											  )
											: null}
									</td>
								</tr>

								{selection?.lease?.landlord &&
								selection?.lease?.landlord.length > 0 ? (
									<>
										<tr className='table--property__row'>
											<th
												className='table--property__th'
												colSpan={1}
											>
												lessor:
											</th>
											<td
												className='table--property__cell'
												colSpan={4}
											>
												{selection?.lease?.landlord[0]?.name}
											</td>
										</tr>

										<tr className='table--property__row'>
											<th
												className='table--property__th'
												colSpan={1}
											>
												{' '}
											</th>
											<td
												className='table--property__cell'
												colSpan={1}
											>
												<b>contacts:</b>
											</td>
											<td
												className='table--property__cell'
												colSpan={1}
											>
												{selection?.lease?.landlord[0]?.email
													? selection?.lease?.landlord[0]?.email
													: ' - '}{' '}
											</td>
											<td
												className='table--property__cell'
												colSpan={1}
											>
												{selection?.lease?.landlord[0]?.landline
													? selection?.lease?.landlord[0]?.landline
													: ' - '}{' '}
											</td>
											<td
												className='table--property__cell'
												colSpan={1}
											>
												{selection?.lease?.landlord[0]?.mobile
													? selection?.lease?.landlord[0]?.mobile
													: ' - '}{' '}
											</td>
										</tr>

										<tr className='table--property__row'>
											<th
												className='table--property__th'
												colSpan={1}
											>
												{' '}
											</th>
											<td
												className='table--property__cell'
												colSpan={1}
											>
												<b>vendor #:</b>
											</td>
											<td
												className='table--property__cell'
												colSpan={3}
											>
												{selection?.lease?.landlord[0]?.vendor
													? selection?.lease?.landlord[0]?.vendor
													: ' - '}{' '}
											</td>
										</tr>

										{selection?.lease?.landlord[1] ? (
											<>
												<tr className='table--property__row'>
													<th
														className='table--property__th'
														colSpan={1}
													>
														{' '}
													</th>
													<td
														className='table--property__cell'
														colSpan={4}
													>
														<hr />
													</td>
												</tr>

												<tr className='table--property__row'>
													<th
														className='table--property__th'
														colSpan={1}
													>
														{' '}
													</th>
													<td
														className='table--property__cell'
														colSpan={4}
													>
														{selection?.lease?.landlord[1]?.name}
													</td>
												</tr>

												<tr className='table--property__row'>
													<th
														className='table--property__th'
														colSpan={1}
													>
														{' '}
													</th>
													<td
														className='table--property__cell'
														colSpan={1}
													>
														<b>contacts:</b>
													</td>
													<td
														className='table--property__cell'
														colSpan={1}
													>
														{selection?.lease?.landlord[1]?.email
															? selection?.lease?.landlord[1]?.email
															: ' - '}{' '}
													</td>
													<td
														className='table--property__cell'
														colSpan={1}
													>
														{selection?.lease?.landlord[1]?.landline
															? selection?.lease?.landlord[1]?.landline
															: ' - '}{' '}
													</td>
													<td
														className='table--property__cell'
														colSpan={1}
													>
														{selection?.lease?.landlord[1]?.mobile
															? selection?.lease?.landlord[1]?.mobile
															: ' - '}{' '}
													</td>
												</tr>

												<tr className='table--property__row'>
													<th
														className='table--property__th'
														colSpan={1}
													>
														{' '}
													</th>
													<td
														className='table--property__cell'
														colSpan={1}
													>
														<b>vendor #:</b>
													</td>
													<td
														className='table--property__cell'
														colSpan={3}
													>
														{selection?.lease?.landlord[1]?.vendor
															? selection?.lease?.landlord[1]?.vendor
															: ' - '}{' '}
													</td>
												</tr>
											</>
										) : null}
									</>
								) : null}
							</tbody>
						</table>
					</div>
				) : (
					<div className='table-container__property'>
						<table className='table--property'>
							<tbody className='table--property__body'>
								<tr className='table--property__row'>
									<th
										className='table--property__th'
										colSpan={1}
									>
										{selection?.business.toUpperCase()}
									</th>
									<th
										className='table--property__th'
										colSpan={2}
									>
										{selection?.holding}
									</th>
									<th
										className='table--property__th'
										colSpan={1}
									>
										{selection?.freehold.status}
									</th>
								</tr>
							</tbody>
						</table>
					</div>
				)}
			</div>
		);
	}

	return (
		<div className='property__container'>
			<h2 className='property__heading'>
				<PropertySearch
					className='property__search-icon'
					height={48}
					width={48}
				/>
				filters by street, suburb and state
			</h2>
			<div className='property__search-bar'>
				{deserializedContent?.length > 0 ? (
					<SearchAutoComplete
						handleOnSelect={handleSelection}
						propertyItems={deserializedContent}
					/>
				) : (
					<>
						<PulseLoader color={'#FFF'} />
						<p>
							...waiting for the database to load, try refreshing the page if
							this message persists.
						</p>
					</>
				)}
			</div>
			{cardContent ? cardContent : null}
		</div>
	);
};
