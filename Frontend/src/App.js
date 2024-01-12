import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form  from './component/formDesign/FormDesign';
import  Login  from './component/LoginDesign/Login';
import  Certificate  from './component/certificateManager/CertificateManager';
import Letter from './component/offerLetter/Letter';
import Terms from './component/termsAndCondition/Terms';
import DocWrapper from './component/docWrapper/DocWrapper';
import AdminPanel from "./component/admin/adminPanel";
import InternProfile from './component/internProfile/internProfile'
import Lor from "./component/admin/LorManager";
import React, {  useState } from 'react';
function App() {
  const [details, setDetails] = useState({name :"", email : "", startDate : "", endDate : "", phoneNumber : "", linkedinProfile : "",instagramId : "", profilePhoto : null, internID : "", jobCategory: ""});
  const [login, setLogin] = useState({email:"", password: ""})
  return (
    <Router>
    <div>
      <Routes>
      <Route exact path = "/" element = {<Form  details = {details} setDetails = {setDetails} />}/>
      <Route exact path = "/adminPanel" element = {<AdminPanel/>}/>      
      <Route exact path="/login" element={<Login login = {login} setLogin = {setLogin}/>} />
      <Route exact path="/certificate" element={<Certificate details = {details}/>} />
      <Route exact path="/offerLetter" element={<Letter details = {details}/>} />
      <Route exact path="/terms" element={<Terms />} />
      <Route exact path="/docs" element={<DocWrapper details = {details}/>} />
      <Route exact path="/internProfile" element={<InternProfile />} />
      <Route exact path="/lor" element={<Lor />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
