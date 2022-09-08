import {
  MdOutlineDashboard,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { TbSend } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { currentUser } from "../redux/actions";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(currentUser([]));
    navigate("/");
  };
  const activeUser = useSelector((state) => state.states.currentUser);

  return (
    <nav>
      <ul>
        <Link className="link" to={`dashboard/${activeUser._id}`}>
          <li>
            <MdOutlineDashboard className="menu-icon" />
            Dashboard
          </li>
        </Link>
        <Link className="link" to="wallet">
          <li>
            <MdOutlineAccountBalanceWallet className="menu-icon" />
            Wallet{" "}
          </li>
        </Link>
        <Link className="link" to="transfer">
          <li>
            <TbSend className="menu-icon" />
            Transfer
          </li>
        </Link>
      </ul>
      <ul>
        <li className="logoutbtn" onClick={logout}>
          <GrLogout className="menu-icon" />
          Logout
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
