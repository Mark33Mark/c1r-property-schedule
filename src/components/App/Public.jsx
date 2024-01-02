import React from 'react';
import { NavBar } from '../NavBar';
import { Footer } from '../Footer';


export const Public = () => {
	const content = (
		<section className='public'>

            <NavBar />

			<main className='public__main'>
                <div className='public__message' >
                    <p> This is a secure site. </p>
                    <p> Please contact the administrator, </p>
                    <p> if you think you should have access. </p>
                </div>
			</main>

            <Footer />

		</section>
	);
	return content;
};
