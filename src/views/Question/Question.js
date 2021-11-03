import React from "react";
import { BackendApi } from "config/config";
import { Button } from "reactstrap";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
//notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify, ErrorNotis} from "components/Toast/ToastNotify";
const Question = () => {
    document.title = "Question and Answer";
   
    const [question, setQues] = React.useState();
    const [answer, setAns] = React.useState();
    const quesHandler = (e) => {
        setQues(e.target.value);
    }
    const ansHandler = (e) => {
        setAns(e.target.value);
    }

    const formHandler = async (e) => {
        e.preventDefault();
        const url = `${BackendApi}/quesans`;
        await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ question, answer })
        }).then(result => {
            notify("Question and Anwser Successfully Added!");
            getdata();
            return result;
        }).catch(error => {
            ErrorNotis("Field all the inputs!");
            return error;
        })
    }

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

    const deleteHander = async (e, id) => {
        e.preventDefault();
        const r = confirm("you want delete this record?");
        if (r == true) {
            const url = `${BackendApi}/qadelete`;
            await fetch(url, {
                method: "post",
                headers:{
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ id })
            }).then(result => {
                getdata();
                notify("Question and Anwser Successfully Deleted!");
                return result;
            }).catch(error => {
                return error;
            })
        } else{
            getdata();
            ErrorNotis("Unauthorized!");
        }
    }
    return (
        <>          
                <div className="card-dash banner-card mb-1">
                    <h1 className="banner-title">Social Media Links</h1>
                    <form className="m-3" onSubmit={formHandler}>
                        <label>Question</label>
                        <input type="text" className="form-control form-input" onChange={quesHandler} id="text-ques" />
                        <label>Answer</label>
                        <input type="text" className="form-control form-input" onChange={ansHandler} id="text-ans" />
                        <button className="btn btn-success button-sm">Save</button>
                    </form>
                </div>           
            <div className="card-dash banner-card mt-1">
                <h1 className="banner-title">Question Answer List</h1>
                <div>
                    {QAData.length > 0 && QAData.map((QA, index) => (
                        <div key={index} className="ListQA">
                            <span>Q{index + 1}.</span> {QA.question}    <Button className="banner-delete btn-outline-danger btn-sm" onClick={(e) => deleteHander(e, QA._id)}><DeleteForeverIcon /></Button><br />
                            <span>Answer.</span> {QA.answer}
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Question;