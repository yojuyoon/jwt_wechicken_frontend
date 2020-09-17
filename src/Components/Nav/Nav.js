import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme, { flexCenter } from "../../Styles/Theme";
import { useHistory, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import ProfileIcon from "../ProfileIcon";
import Login from "../Login/Login";
import BtnTheme from "../Buttons/BtnTheme";
import { useDispatch, useSelector } from "react-redux";
import { loginToken } from "../../store/actions/loginAction";
import CreateMyGroup from "../../Pages/MyGroup/CreateMyGroup/CreateMyGroup";
import ModifyMyGroup from "../../Pages/MyGroup/ModifyMyGroup/ModifyMyGroup";
import DropDown from "./DropDown";
import SearchBar from "./SearchBar";
import Alert from "../../Components/Alert";

const Nav = () => {
  const [isdropDownOpen, setDropDownOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [isModalOn, setModalOn] = useState(false);
  const [isCreateMyGroupModalOn, setCreateMyGroupModalOn] = useState(false);
  const [isModifyMyGroup, setModifyMyGroup] = useState(false);
  const [isActiveAlert, setActiveAlert] = useState(false);
  const history = useHistory();

  //redux
  const loginStatus = useSelector((state) => state.loginReducer);
  const userProfileImg = useSelector((state) => state.userProfileReducer);
  const getMyGroupTitle = useSelector((state) => state.myGroupTitleReducer);
  const myGroupTitleStatus = useSelector(
    (state) => state.myGroupTitleStatusReducer
  );
  const searchKeyword = useSelector((state) => state.searchKeywordReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    handleSelectedFunctions(selectedMenu);
  }, [selectedMenu]);

  const handleSelectedFunctions = (selected) => {
    setDropDownOpen(false);
    if (selected === "로그아웃") {
      setActiveAlert(true);
    }
  };

  return (
    <>
      {isActiveAlert && (
        <Alert
          setActiveAlert={setActiveAlert}
          setSelectedMenu={setSelectedMenu}
          selectedMenu={selectedMenu}
          alertMessage={"로그아웃 하시겠습니까?"}
          excuteFunction={() => {
            sessionStorage.removeItem("USER");
            dispatch(loginToken(""));
            history.push("/");
            window.location.reload();
          }}
          submitBtn={"확인"}
          closeBtn={"취소"}
        />
      )}
      <NavContainer onMouseLeave={() => setDropDownOpen(false)}>
        {isModalOn && <Login setModalOn={setModalOn} />}
        {isCreateMyGroupModalOn && (
          <CreateMyGroup setCreateMyGroupModalOn={setCreateMyGroupModalOn} />
        )}
        {isModifyMyGroup && (
          <ModifyMyGroup
            getMyGroupTitle={getMyGroupTitle}
            setModifyMyGroup={setModifyMyGroup}
          />
        )}
        <LogoWrap>
          <Link onClick={() => setSelectedMenu("")} to="/">
            <Logo>
              <img className="logoImage" alt="logo" src="/Images/logo.png" />
              <div className="logoText">&gt;wechicken</div>
            </Logo>
          </Link>
          <NthTitle>{myGroupTitleStatus ? getMyGroupTitle : ""}</NthTitle>
          {history.location.pathname === "/MyGroup" &&
            JSON.parse(sessionStorage.getItem("USER"))?.master && (
              <FontAwesomeIcon
                onClick={() => setModifyMyGroup(true)}
                className="settingMyGroup"
                icon={faCog}
              />
            )}
        </LogoWrap>
        <UserWrap>
          {!searchKeyword && <SearchBar />}
          {loginStatus ? (
            <>
              {JSON.parse(sessionStorage.getItem("USER"))?.master && (
                <img
                  className="masterCrown"
                  alt="master"
                  src="/Images/crown.png"
                />
              )}
              <div onMouseOver={() => setDropDownOpen(true)}>
                <ProfileIcon size={50} img={userProfileImg} />
              </div>
            </>
          ) : (
            <div>
              <BtnTheme
                value={"로그인"}
                handleFunction={() => setModalOn(true)}
              />
            </div>
          )}
        </UserWrap>
        {isdropDownOpen && (
          <DropDown
            setDropDownOpen={setDropDownOpen}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            setCreateMyGroupModalOn={setCreateMyGroupModalOn}
          />
        )}
      </NavContainer>
    </>
  );
};

const NavContainer = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 111px;
  padding: 0 8vw;
  background-color: ${theme.white};
  z-index: 9;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const LogoWrap = styled.div`
  width: 422px;
  height: 52px;
  display: flex;
  align-items: center;

  .settingMyGroup {
    margin-left: 15px;
    color: ${theme.deepGrey};
    cursor: pointer;
    opacity: 0.7;
  }
  .settingMyGroup:hover {
    opacity: 1;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  width: 190px;

  .logoImage {
    width: 51px;
    height: 52px;
    margin-right: 10px;
    border-radius: 50px;
  }

  .logoText {
    width: 130px;
    font-family: ${theme.fontTitle};
    font-weight: 500;
    font-size: 20px;
    line-height: 27px;
    color: #2d2b2b;
  }
`;

const NthTitle = styled.div`
  font-family: ${theme.fontTitle};
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: ${theme.orange};
`;

const UserWrap = styled.div`
  ${flexCenter}
  height: 47px;
  position: relative;

  .masterCrown {
    width: 25px;
    height: 25px;
    position: absolute;
    top: -20px;
    right: 12px;
  }
`;

export default Nav;
