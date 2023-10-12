import { fireEvent, render, screen } from "@testing-library/react";
import Greeting from "./Greeting";


describe("Greeting component", ()=>{
    test("renders Hello world as a text", ()=>{
        //arrange
        render(<Greeting/>);

        //Action

        //Assert
        //can add {exact: false} for case ignore comparasion
        const helloWorldElement = screen.getByText("hello World", {exact: false});
        expect(helloWorldElement).toBeInTheDocument();

    });

    test("renders it's nice to meet you as text on load", ()=>{
        let message = "Nice to meet you";
        render(<Greeting/>);
        const textElement = screen.getByText(message);
        expect(textElement).toBeInTheDocument();
    });

    test("renders I have been changed when the text change button is clicked", ()=>{
        let message = "I have been changed";
        render(<Greeting/>);
        const changeTextButton = screen.getByRole("button");

        fireEvent(changeTextButton, new MouseEvent('click', {
            bubbles: true,
            cancelable: true
        }),
        )
        changeTextButton.click();
        const textElement = screen.getByText(message);
        expect(textElement).toBeInTheDocument();
    })

    //-ve test

    test("does not render Nice to meet you when button is clicked", ()=>{
        render(<Greeting/>);
        const button = screen.getByRole("button");
        fireEvent(button, new MouseEvent('click', {
            bubbles: true,
            cancelable: true 
            
        }));

        //queryByText used incase the element may not be there, otherwise it will throw an error
        const outputElement = screen.queryByText("Nice to meet you");  
        expect(outputElement).not.toBeInTheDocument();
    })

});
