import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuthor } from "../../reducers/todoReducer.js";
import smile from "../../assets/smile.svg";

const Header = () =>{ 
  const dispatch = useDispatch()
  const author = useSelector(state => state.todos.author);
    
  return(
    <div className="Header">
      <input onChange={e => dispatch(setAuthor(e.target.value))} type="text" id="userName" placeholder="your name" value={author} />
      <img id="moji" src={smile} alt="smile" />
</div>
)}

export default Header;