import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setName } from '../../store/userSlicer.js';

import smile from '../../assets/smile.svg';

function Header({ s }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

  function newUsername(e) {
    dispatch(setName(username));
    s.emit('newUsername', username);
  }

  return (
    <div className="Header">
      <input type="text" value={username} onBlur={newUsername} onChange={(e) => setUsername(e.target.value)} placeholder="your name" />
      <img id="moji" src={smile} alt="smile" />
    </div>
  );
}

export default Header;
