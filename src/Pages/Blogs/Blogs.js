import React from 'react';
import useTitle from '../../Hooks/useTitle/useTitle';

const Blogs = () => {
    useTitle("Blogs")
    return (
        <div className='h-full md:h-screen'>
            <h1 className='text-center font-semibold text-xl my-10'>Blogs</h1>
            <div className='px-4 md:px-32 '>

                <div className='grid  gap-10 grid-cols-1  md:grid-cols-2'>
                    <details className=' p-4 rounded-lg '>
                        <summary className="py-2 select-none font-semibold outline-none text-xl cursor-pointer"> What are the different ways to manage a state in a React application?</summary>
                        <div className="px-4 pb-4">
                            <p>There are four main types of state you need to properly manage in your React apps:
                                Local state,
                                Global state,
                                Server state,
                                URL state,</p>
                            <p>
                                <strong>Local (UI) state</strong> – Local state is data we manage in one or another component.
                            </p>
                            <p>
                                <strong> Global (UI) state</strong> – Global state is data we manage across multiple components.
                            </p>
                            <p>
                                <strong> Server state</strong> – Data that comes from an external server that must be integrated with our UI state.
                            </p>
                            <p>
                                <strong> URL state</strong> – Data that exists on our URLs, including the pathname and query parameters.
                            </p>
                        </div>
                    </details>
                    <details className=' p-4 rounded-lg '>
                        <summary className="py-2 select-none font-semibold outline-none text-xl cursor-pointer">How does prototypical inheritance work?</summary>
                        <div className="px-4 pb-4">
                            <p>
                                The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object
                            </p>

                        </div>
                    </details>
                    <details className=' p-4 rounded-lg '>
                        <summary className="py-2 select-none font-semibold outline-none text-xl cursor-pointer">What is a unit test? Why should we write unit tests?</summary>
                        <div className="px-4 pb-4">
                            <p>
                           <strong> Unit Testing</strong> is a type of software testing where individual units or components of a software are tested. The purpose is to validate that each unit of the software code performs as expected
                            </p>
                            <br />
                            <p>
                            Well-written unit tests act as documentation for your code. Any developer can quickly look at your tests and know the purpose of your functions. It simplifies the debugging process. Unit testing is an integral part of extreme programming

                            </p>


                        </div>
                    </details>
                    <details className=' p-4 rounded-lg '>
                        <summary className="py-2 select-none font-semibold outline-none text-xl cursor-pointer">React vs. Angular vs. Vue?</summary>
                        <div className="px-4 pb-4">
                            <p>
                            Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option

                            </p>


                        </div>
                    </details>

                </div>
        
            </div>

        </div>
    );
};

export default Blogs;