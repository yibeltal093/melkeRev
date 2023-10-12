import {render, screen} from '@testing-library/react';
import Async from './Async';

describe('Async Component', () => {
    //We have using untile the fetch data is loading
    test('renders posts if request succeeds', async () =>{
        //we will mock instead of loading from fetch

///==================//This file is in .jsx to avoid error====================///
        // window.fetch = jest.fn();//mocking the fetch module from the window directly
        // window.fetch.mockResolvedValueOnce({
        //     json: async()=>[{id: '1', title: 'first post'}],
        // });

//====================================tsx file=======================//
        jest.spyOn(window, "fetch").mockResolvedValue({
            json: async() => [{id: '1', title: 'first post'}],
        } as any);

        render(<Async/>);

        //Fetch request gets a list
        //This will get back all items of list on the page.
        const listItemElement = await screen.findAllByRole("listitem");
        //check list is not empty


       // expect(listItemElement).not.toHaveLength(0); ==>changed for tsx below

       expect(listItemElement[0]).toHaveTextContent("first post");




    });
});