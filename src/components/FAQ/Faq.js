import React from "react";
import { BackendApi } from "config/config";


const Faq = () => {

    const url = `${BackendApi}/findqa`;
    const [QAData, setQAData] = React.useState([]);
    const getdata = async () => {
        const response = await fetch(url);
        const QA = await response.json();
        setQAData(QA.data)
    }
    React.useEffect(() => {
        getdata();
    }, [url]);



    return (
        <>
            <div className="container p-5">
                <h3 className="text-primary">FREQUENTLY ASKED QUESTIONS ABOUT L7 Exchange</h3>
                <hr />
                <div className="accordion" id="FAQsection">
                    {QAData.length > 0 && QAData.map((QA, index) => {
                        let sclass = (index === 0) ? "show" : "";
                        return <div className="accordion-item" key={index}>
                            <h2 className="accordion-header mt-0" id={`headingOne${index}`}>
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne" + index} aria-expanded={index === 0 ? "true" : "false"} aria-controls={"collapseOne" + index}>
                                    <span className="FAQList">Q{index + 1}.</span>  {QA.question}
                                </button>
                            </h2>
                            <div id={"collapseOne" + index} className={"accordion-collapse collapse " + sclass} aria-labelledby={`headingOne${index}`} data-bs-parent="#FAQsection">
                                <div className="accordion-body">
                                    <span className="FAQList">Answer.</span> {QA.answer}
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}

export default Faq