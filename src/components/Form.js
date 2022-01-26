import React, { useState } from 'react';
import axios from 'axios'
function Form() {
    const [name,setName]=useState("");
    const [dob,setDob]=useState("");
    const [time,setTime]=useState("");
    const [ccode,setCcode]=useState("91");
    const [contact,setContact]=useState("");
    const [email,setEmail]=useState("");
    const [valid,setValid]=useState(false);
    const [verify,setVerify]=useState(true)
    const nameChange=(e)=>{
        setName(e.target.value)
        isValidForm()
    };
    const dobChange=(e)=>{
        setDob(e.target.value)
        isValidForm()
    }
    const timeChange=(e)=>{
        setTime(e.target.value)
        isValidForm()
    };
    const ccodeChange=(e)=>{
        setCcode(e.target.value)
    }
    const contactChange=(e)=>{
        setContact(e.target.value)
        isValidForm()
    };
    const emailChange=(e)=>{
        setEmail(e.target.value)
        isValidForm()
    };
    const isValidForm = () => {

        if(name !== '' && time !=='' && contact !=='' && email !=='' && dob!==''){
            setValid(true);
        }else {
            setValid(false);
        }
    }
    const verifyC=()=>{
        setVerify(!verify)
        console.log(verify)
        if (verify==true){
            isValidForm()
        }
        else{
            setValid(false)
        }
    }
    const result=(e)=>{
        e.preventDefault();
        let dataStr={
            name:name,
            dob:dob,
            timeZone:time,
            whatAppContact:ccode+contact,
            Email:email,
        }
        isValidForm()
        axios({
            method:"POST",
            url:'https://her-shreersc-express-server.herokuapp.com/v1/admin/registerStudent',
            data:dataStr,
            headers:{
                    'Content-Type': 'application/x-www-form-urlencoded' 
                    }
                })
                .then(response=>console.log(response))
        alert("Success")
        reset()
        }
       const reset=()=>{
        setName("")
        setTime("")
        setContact("")
        setDob("")
        setEmail("")
       }
  return <div>
            <h1>Register a new Student</h1>
            <h3>Personal Details:</h3>
            <form >
                <div className='in'>
                    <input type="text" placeholder="  Enter Student Name" name="name" onChange={nameChange} value={name}/><br/>
                    <input type="date" placeholder='Date of Birth' onChange={dobChange} value={dob}/>
                    <select name="times" value={time} onChange={timeChange}>
                        <option value="">--Select Time Zone--</option>
                        <option value="(UTC-5) Estern Standard Time">  (UTC-5) Estern Standard Time</option>
                        <option value="UTC Western Europe Time">  UTC Western Europe Time</option>
                        <option value="(UTC+5:30) Indian Standard Time">  (UTC+5:30) Indian Standard Time</option>
                    </select><br/>

                    <select id="ccode" onChange={ccodeChange} value={ccode}>
                        <option value="91">IN 91</option>
                        <option value="1">US 1</option>
                        <option value="81">JP 81</option>
                    </select>
                    <input id="num"  placeholder="  Whatsapp Mobile Number" type="number" name="contact" onChange={contactChange} value={contact}/>
                    <input type="email" placeholder="  E-Mail" name="email" onChange={emailChange} value={email}/><br/>
                </div>
                <input type="checkbox" onClick={verifyC} id="checkVer"/>
                <label htmlFor='checkVer'>I accept the terms and Conditions</label><br/><br/>
                <button onClick={result} className ={valid ? 'buttonSave' : 'disableBtn'} disabled= {valid ? false : true} >Register New Student</button>
            </form>
            
            
        </div>;
}

export default Form;
