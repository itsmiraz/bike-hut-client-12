import React from 'react';

const Facilites = () => {
    return (
        <div className='grid my-20 grid-cols-1 md:grid-cols-2 px-10'>
            <img src="https://i.ibb.co/z2X74JZ/KTM-390-DUKE-SILVER-METALLIC-MATT-1.jpg" alt="" />
            <div className='my-10'>
                <h1 className='text-4xl font-bold'>Frequently Asked Questions</h1>
                <details className=' mt-4 rounded-lg '>
                        <summary className="py-2 select-none font-semibold outline-none text-xl cursor-pointer">Who are we?</summary>
                        <div className="px-4 ">
                        <p>
                                <strong>Bike Hut</strong> is a site where any one can sell and buy their bikes.We are a middleware where any one can instatly post their bikes.

                            </p>
                           
                        </div>
                    </details>
                <details className='  rounded-lg '>
                        <summary className="py-2 select-none font-semibold outline-none text-xl cursor-pointer">Why should you trust us?</summary>
                        <div className="px-4 ">
                        <p>

                                We are the most reputed company in this catagory for out loaylity. We have 24/7 customer suppot .So that you can any time clear any query of yours.

                            </p>
                           
                        </div>
                    </details>
                <details className='  rounded-lg '>
                        <summary className="py-2 select-none font-semibold outline-none text-xl cursor-pointer">How long we have been in this buisness?</summary>
                        <div className="px-4 ">
                        <p>

                                Bike hut started in 2019. So three years of journey.Now we are here we tried our best for our customer statisfaction.Becasus our role is customer comes first.

                            </p>
                           
                        </div>
                    </details>
                <details className='  rounded-lg '>
                        <summary className="py-2 select-none font-semibold outline-none text-xl cursor-pointer">Does any one can sell their bikes?</summary>
                        <div className="px-4 ">
                        <p>

        Yes,but make sure when you creating a new account you must select account type seller so that you can post your add.Otherwise our system will count you as a buyer.

                            </p>
                           
                        </div>
                    </details>
            </div>
        </div>
    );
};

export default Facilites;