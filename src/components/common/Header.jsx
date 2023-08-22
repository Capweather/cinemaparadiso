import React from "react";
import { useDispatch } from "react-redux";
// import Iconlogo from "../../assets/img/icon-small-menu.svg";
import Iconlogo from "../../assets/img/icon-small-menu.svg"
// import { push } from "connected-react-router";

function Header() {
    const dispatch=useDispatch();
    return (
        <>
        <header>           
            {/* <img class="logo" src={Iconlogo} onClick={() =>dispatch(push('/'))} alt =""/> */}
            <div class="side-head">
                <div class="search">
                    <input type="text"/>
                </div>
                <div class="option">
                    {/* <p onClick={()=>dispatch(push('/categories'))}>Category</p>
                    <p onClick={()=>dispatch(push('/favorites'))}>Add to Wishlist</p> */}
                </div> 
            </div>
        </header>
        </>
    )
}

export default Header;