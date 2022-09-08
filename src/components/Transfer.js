import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const Transfer = ({ activeUser }) => {
  const [ban, setBan] = useState("");
  const [transferAmount, setTransferAmount] = useState();
  const [resStatus, setResStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountToCredit, setAccountToCredit] = useState();
  const [transferLoading, setTransferLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState(false);
  const navigate = useNavigate();
  const endpoint = "http://localhost:5000/user/gettransferdetails";

  const handleSubmit = () => {
    setTransferLoading(true);
    processTransaction();
  };

  const creditAccount = () => {
    accountToCredit.AccountBalance += Number(transferAmount);
    let creditDetails = {
      transferAmount,
      ban: activeUser.FirstName + " " + activeUser.LastName,
      transactype: false,
      userImage: activeUser.image,
    };

    accountToCredit.recentTransaction.unshift(creditDetails);
  };
  const debitAccount = () => {
    activeUser.AccountBalance -= transferAmount;
    let debitDetails = {
      transferAmount,
      ban,
      transactype: true,
      userImage: accountToCredit.image,
    };
    activeUser.recentTransaction.unshift(debitDetails);
  };
  const processTransaction = () => {
    if (activeUser.AccountBalance >= transferAmount) {
      let API = "http://localhost:5000/user/posttransaction";
      debitAccount();
      creditAccount();
      axios.post(API, { accountToCredit, activeUser }).then((res) => {
        if (res.data.status) {
          setTransferLoading(false);
          setResponseStatus(true);
          setTimeout(() => {
            navigate(`/home/dashboard/${activeUser._id}`);
          }, 5000);
        } else {
        }
      });
    }
  };

  const getban = (e) => {
    if (/[\d]{10}/g.test(e.target.value)) {
      setLoading(true);
      axios.post(endpoint, { num: e.target.value }).then((res) => {
        if (res.data.status) {
          let details = res.data.response;
          setAccountToCredit(details);
          setBan(details.FirstName + " " + details.LastName);
          setResStatus(true);
          setLoading(false);
        } else {
          setLoading(false);
          setResStatus(false);
        }
      });
    }
  };

  return (
    <div className="transfer">
      {responseStatus && (
        <Alert key="success" variant="success">
          Transfer Successfull!.You will now be redirected to your Dashboard
        </Alert>
      )}
      <div className="form2">
        <h1>TRANSFER</h1>
        <input
          value={activeUser.FirstName + " " + activeUser.LastName}
          readOnly
          type="text"
        />
        <br />
        <input value={activeUser.Accountnum} readOnly type="text" />
        <br />
        <input
          onChange={(e) => getban(e)}
          type="number"
          placeholder="Beneficiary Account number"
        />
        <div className="transfermodal">
          {loading ? (
            <Spinner animation="border" variant="secondary" />
          ) : (
            <p>
              {resStatus ? (
                <p>{ban}</p>
              ) : (
                <p style={{ clor: "red" }}>User Not found!</p>
              )}{" "}
            </p>
          )}
        </div>

        <input
          value={transferAmount}
          onChange={(e) => setTransferAmount(e.target.value)}
          type="number"
          placeholder="Transfer Amount"
        />
        <br />
        <button onClick={handleSubmit}>
          {transferLoading ? (
            <Spinner animation="border" variant="light" />
          ) : (
            "Transfer"
          )}
        </button>
      </div>
    </div>
  );
};

export default Transfer;
