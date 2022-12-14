import React, { useEffect, useState } from 'react';
import { showToast } from '../../lib/toasti';
import './Profile.css';

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const [userAvatar, setUserAvatar] = useState({
    path: `${userInfo.avatar}`,
  });
  const formInitialState = {
    avatar: `${userInfo?.avatar}`,
    login: `${userInfo?.login}`,
    password: '',
    phone: `${userInfo?.phone}`,
    email: `${userInfo?.email}`,
  };

  const [img, setImg] = useState(null);
  const [form, setForm] = useState(formInitialState);
  // const { user } = useSelector((store) => store.userStore);

  console.log(userInfo, 'user user uis info');

  useEffect(() => {
    fetch('http://localhost:6622/api/profile', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, []);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    // try {
    e.preventDefault();
    const data = new FormData();
    data.append('avatar', img);
    // data.append('form', JSON.stringify(form));
    const url = 'http://localhost:6622/api/avatar';
    fetch(url, {
      method: 'POST',
      credentials: 'include',
      // headers: {
      //   'content-type': 'multipart/form-data',
      // },
      body: data,
    })
      .then((res) => res.json())
      .then((newdata) => {
        console.log(newdata);
        setUserInfo({
          avatar: newdata.findThisUser.avatar,
        });
        showToast({ message: 'Файл загружен', type: 'success' });
      });
    // if (res.status === 200) {
    //   showToast({ message: 'Данные изменены', type: 'success' });
    //   setUserInfo({ avatar: data.avatar });
    // }

    // .then((data) => { console.log(data); });
  };
  // setUserInfo({ avatar: data1.avatar });
  // setForm(formInitialState);
  //     if (res.status === 200) {
  //       showToast({ message: 'Данные изменены', type: 'success' });
  //       setUserInfo({ avatar: res.avatar });
  //     }
  //   } catch (error) {
  //     console.log('======>>>', error);
  //     showToast({ message: 'Не получилось', type: 'error' });
  //   }
  // };
  // const handleSubmit1 = (e) => {
  //   console.log('forma');
  // };

  const uploudImg = (e) => {
    setImg(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  // const avatarPath = () => {
  //   if (userAvatar.path === undefined) {
  //     return userInfo.avatar;
  //   }
  // };
  return (
    <div className="container">

      <form className="changeAva" onSubmit={handleSubmit}>
        <div className="formInput">
          <label className="form-label ">Изменить аватар</label>
          <input type="file" name="file" onChange={uploudImg} />
        </div>
        <button type="submit" className="buttonSubmit">Submit</button>
      </form>

      <div className="profileAvatar"><img className="imgProfile" src={`http://localhost:6622/${userInfo.avatar}`} alt="аватарка" /></div>
      {/* <form className="formDiv" onSubmit={handleSubmit1}>

        <div className="formInput">
          <label className="form-label ">login</label>
          <input type="text" className="form-control" value={form.login} name="login" placeholder={user.login} onChange={handleInput} />
        </div>

        <div className="formInput">
          <label className="form-label ">password</label>
          <input type="password" defaultValue="dsfsdfdsfdsf" className="form-control" value={form.password} name="password" placeholder="Пароль сотрудника" onChange={handleInput} />
        </div>

        <div className="formInput">
          <label className="form-label ">email</label>
          <input type="email" className="form-control" value={form.email} name="email" placeholder="email" onChange={handleInput} />
        </div>

        <div className="formInput">
          <label className="form-label ">телефон</label>
          <input type="text" className="form-control" value={form.phone} name="phone" placeholder="телефон" onChange={handleInput} />
        </div>
        <div className="formInput">
          <label className="form-label ">Загрузить Аватар</label>
          <input type="file" name="file" onChange={uploudImg} />
        </div>

        <button type="submit" className="buttonSubmit">Submit</button>
      </form> */}
    </div>
  );
}
