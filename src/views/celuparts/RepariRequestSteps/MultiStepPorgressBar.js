/* eslint-disable */
import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import "./MultiStepPorgressBar.css"

export const  MultiStepPorgressBar = (props) => {
    return (
        <ProgressBar
            percent={ ((props.step - 1) * 100) / 2}
            filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        >
            <Step transition="scale">
                {({ accomplished, index }) => (
                    <div className={`step ${accomplished ? "completed" : ""}`}>
                        1
                    </div>
                )}
            </Step>
            <Step transition="scale">
                {({ accomplished, index }) => (
                    <div className={`step ${accomplished ? "completed" : ""}`}>
                        2
                    </div>
                )}
            </Step>
            <Step transition="scale">
                {({ accomplished, index }) => (
                    <div className={`step ${accomplished ? "completed" : ""}`}>
                        3
                    </div>
                )}
            </Step>
        </ProgressBar>
    );
}

export default MultiStepPorgressBar;