import React, { useState } from "react";
//import Loader from "../../Loader";
//import PostStatusWithHooks from "./PostStatusWithHooks";
//import ava from "../../../assets/images/ava.png";
//import { Avatar } from 'antd';
//import ProfileDataContactForm from './ProfileDataContactForm'
import {  Col,  Row } from 'antd';
import { Upload, message, Button } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import PicturesWall from "./UploadPhotoAva";
import {Navigate , NavLink } from "react-router-dom";

export const EventProfile = ({isOwner, eventProfile,hendlDelEvent,delEventProfile,eventUserName})=>{
    debugger
    const [editMode,setEditMode] = useState(false)
    //if(!postUser){
        //return <Loader/>
    //}
    if(delEventProfile) {
      debugger
      return <Navigate to={"/events"}/>
    }
return (
  <div>
    <div>
      {/*isLoader? <Loader/>  : null*/}
      <Row>
        <Col span={8}>
          <div>
            <div>
              <h2>{eventProfile.name}</h2>
            </div>
            {/*<PostStatusWithHooks 
status={postUser.status} updateStatus={updateStatus}/>*/}
          </div>

          <div style={{ marginTop: "30px" }}>
            <Avatar
              size={200}
              src={`data:image/jpg;base64,${eventProfile.imgAvatarId}` || Avatar}
            />
          </div>

          <div style={{ marginTop: "30px" }}>
            {editMode === true && isOwner === true ? null : isOwner ? (
              <div>
                <Button
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => setEditMode(true)}
                >
                  Редактировать 
                </Button>
              
              <Button
                size="small"
                icon={<EditOutlined />}
                onClick={() => hendlDelEvent()}
              >
                Удалить
              </Button>
            </div>
            ) : null}
          </div>

          {/*isOwner ? (
            <PicturesWall 
            uploadPhoto={uploadPhoto}/>

          ) : null*/}

        </Col>

        <Col span={16}>
          <div>
            {editMode ? (
              <ProfileDataContact
              //eventProfile={eventProfile||""}
                //contact={contact}
                //onSubmit={onSubmit}
              />
            ) : (
              //goToEditMode={()=>{ setEditMode(false);} } />:
              <ProfileDataContact
              eventProfile={eventProfile}
              isOwner={isOwner}
              eventUserName={eventUserName}
                //contact={contact}
               /* name={postUser.name}
                aboutMe={postUser.aboutMe}
                // lookingForAJob={postUser.lookingForAJob}
                //lookingForAJobDescription={postUser.lookingForAJobDescription}
                //nestName={postUser.nest}
                sex={postUser.sex}
                age={postUser.age}
                goToEditMode={() => {
                  setEditMode(true);
                }}*/
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  </div>
)
}

const ProfileDataContact =({eventProfile,isOwner,eventUserName })=>{
    return <div>
        {/*isOwner ? <div><button onClick={goToEditMode}>Редактировать</button></div> : null*/}
        <div><h2><b>{isOwner?"Это ваше событие":'Это чужое событие'}</b></h2></div>
        
        <NavLink to={`/profile/` + eventProfile.ownerUser}>
        <h3><b>Создатель:</b>{eventUserName.name +" "+eventUserName.surname }</h3>
        </NavLink>
        <div><h3><b>Описание:</b>{eventProfile.description}</h3></div>
        <div><h3><b>Адрес:</b>{eventProfile.address}</h3></div>
        <div><h3><b>Город:</b>{eventProfile.city}</h3></div>
        <div><h3><b>Тип:</b>{eventProfile.type}</h3></div>
        <div><h3><b>Количество мест:</b>{eventProfile.amountMaximum}</h3></div>
        <div><h3><b>Возрастные ограничения:</b>{eventProfile.amountMaximum +""+"+"}</h3></div>
        <div><h3><b>Начало события:</b>{moment.utc(eventProfile.dateOfTheEvent[0]).format('DD/MM/YYYY')}</h3></div>
        <div><h3><b>Окончание события:</b>{moment.utc(eventProfile.dateOfTheEvent[1]).format('DD/MM/YYYY')}</h3></div>
           {/*<b>Участники события: </b> {users.map((u)=> u._id)+","}*/}  
    {/*Object.keys(contact).map((key) =>{
        return <Contacts 
        key={key} 
        ContactTitle={key} 
        ContactValue={contact[key as keyof ContactsType]}
        />
        } ) }*/}
    </div>
}