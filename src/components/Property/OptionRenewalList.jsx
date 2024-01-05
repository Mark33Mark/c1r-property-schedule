import React, { useState, useEffect } from 'react';
import { useGetPropertiesQuery } from '../../store/slices';

export const OptionRenewalList = () => {

    const { properties } = useGetPropertiesQuery(
		'propertiesList',
		{
			selectFromResult: ({ data }) => ({
				properties: data,
			}),
		}
	);

    let deserializedContent;
    let newObjArray = []

    if (properties) {
		const { ids, entities } = properties;

		// remove the id serialization by RTK's createEntityAdapter
		deserializedContent =
			ids?.length && ids.map((propertyId) => entities[propertyId]);

            deserializedContent.map( obj => {
                const {_id, id, status, type, ...destructuredContent} = obj;
            
                    newObjArray.push(destructuredContent);
                })
            }
    
            console.log('date to filter = ', newObjArray);

    

    return (
        <div>Options Dashboard</div>

    )
}