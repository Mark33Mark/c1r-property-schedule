import React from 'react';
import { Flower } from '../../assets/icons/Flower';
import { CompanyLogoMW } from '../../assets/icons/CompanyLogoMW';

export const Footer = () => {


    const content = (
        <footer className='public__footer'>
            <Flower
                className='public__flower-icon'
                height='80px'
                width='80px'
            />
            <a
                className='public__company-logo'
                href='https://get.watsonised.com'
                target='_blank'
                rel='noopener noreferrer'
            >
                <CompanyLogoMW
                    height='60px'
                    width='60px'
                />
            </a>
            <address className='public__addr'>
                <p>CSR Corporate HQ</p>
                <p>Triniti 3</p>
                <p>39 Delhi Road</p>
                <p>North Ryde, NSW 2113</p>
                <p>Australia</p>
                <p><a href='tel:+61-2-9235-8000'>(02) 9235-8000</a></p>
            </address>
        </footer>
    );
    return content;
};
