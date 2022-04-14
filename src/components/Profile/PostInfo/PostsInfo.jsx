import React, { useState } from "react";
//import Loader from "../../Loader";
import banner_1 from "../../../assets/images/banner-1.jpg";
import banner_2 from "../../../assets/images/banner-2.jpg";
import banner_3 from "../../../assets/images/banner-3.jpg";
import banner_4 from "../../../assets/images/banner-4.jpg";
//import PostStatusWithHooks from "./PostStatusWithHooks";
//import ava from "../../../assets/images/ava.png";
//import { Avatar } from 'antd';
//import ProfileDataContactForm from './ProfileDataContactForm'
import { Carousel, Col,  Row } from 'antd';
import { Upload, message, Button } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import PicturesWall from "./UploadPhotoAva";

export const PostInfo = ({isOwner, postUser,uploadPhoto,imgAva})=>{
    //const isLoader=useSelector((state)=>state.postsPage.isLoader)
    const [editMode,setEditMode] = useState(false)
    if(!postUser){
        //return <Loader/>
    }
//todo
    /*const onSubmit = (value:UserType)=>{
        saveProfile(value).then(()=>{
            setEditMode(false)
        })*/
        //setEditMode(false)
   //}
    //let contact = postUser.contacts
return (
  <div>
    <div>
      <Carousel autoplay>
        <div>
          <img src={banner_1} />
        </div>
        <div>
          <img src={banner_2} />
        </div>
        <div>
          <img src={banner_3} />
        </div>
        <div>
          <img src={banner_4} />
        </div>
      </Carousel>
    </div>
    <div>
      {/*isLoader? <Loader/>  : null*/}
      <Row>
        <Col span={8}>
          <div>
            <div>
              <h2>{postUser.name + " " + postUser.surname}</h2>
            </div>
            {/*<PostStatusWithHooks 
status={postUser.status} updateStatus={updateStatus}/>*/}
          </div>
          <div style={{ marginTop: "30px" }}>
            <Avatar
              size={200}
              src={`data:image/jpg;base64,${imgAva.img_1000_1000}` || Avatar}
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
              </div>
            ) : null}
          </div>

          {isOwner && 
            <PicturesWall 
            uploadPhoto={uploadPhoto}/>
          }

        </Col>

        <Col span={16}>
          <div>
            {editMode ? (
              <ProfileDataContact
                initialValues={postUser}
                //contact={contact}
                //onSubmit={onSubmit}
              />
            ) : (
              //goToEditMode={()=>{ setEditMode(false);} } />:
              <ProfileDataContact
                //contact={contact}
                name={postUser.name}
                surname={postUser.surname}
                isOwner={isOwner}
                aboutMe={postUser.aboutMe}
                // lookingForAJob={postUser.lookingForAJob}
                //lookingForAJobDescription={postUser.lookingForAJobDescription}
                //nestName={postUser.nest}
                sex={postUser.sex}
                age={postUser.age}
                goToEditMode={() => {
                  setEditMode(true);
                }}
              />
            )}
          </div>
        </Col>
      </Row>
    </div>
  </div>
);}

const ProfileDataContact =({
    isOwner,goToEditMode,age,sex,name,surname,aboutMe})=>{
    return <div>
        {/*isOwner ? <div><button onClick={goToEditMode}>Редактировать</button></div> : null*/}
        <div><h3><b>Имя:</b>{name}</h3></div>
        <div><h3><b>Фамилия:</b>{surname}</h3></div>
        <div><h3><b>Дата рождения:</b>{moment.utc(age).format('DD/MM/YYYY')}</h3></div>
        <div><b>Пол: </b>{sex===true? "Мужской" : "Женский"} </div>
            {/*<b>Мои активные гнёзда: </b> {nestName.map((u: { name: string})=> u.name)+","} 
        <div><b>Участие в гнёздах: </b>{}  </div>*/}
        <div><b>Обо мне: </b>{aboutMe}  </div>
    {/*Object.keys(contact).map((key) =>{
        return <Contacts 
        key={key} 
        ContactTitle={key} 
        ContactValue={contact[key as keyof ContactsType]}
        />
        } ) }*/}
    </div>
}