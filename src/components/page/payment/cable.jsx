import { useState } from "react";
import Confirm from "../../helper/confirm";
import { Product } from "../../nav/header";
import { dValue, ds_tv, go_tv, star_time } from "../../utils/cable_data";

export default function Cable() {
  const [form, setForm] = useState({});
  const [cable, setCable] = useState(dValue);
  const [confirm, setConfirm] = useState(false);

  // input change handler
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "cableType") {
      switch (e.target.value) {
        case "GOTV":
          setCable(go_tv);
          break;

        case "DSTV":
          setCable(ds_tv);
          break;

        case "Startime":
          setCable(star_time);
          break;

        default:
          setCable(dValue);
          break;
      }
    }
  };

  // validate the data and show the pin component
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setConfirm(true);
  };

  //send the dat to the database
  const purchase = (sendValue) => {
    console.log("inside cable conponent", sendValue);
  };

  const PathName = window.location.pathname;

  return (
    <>
      {PathName === "/cables-sub" ? (
        <Product productName="Cable Subscription" />
      ) : (
        ""
      )}
      <div className={PathName === "/cables-sub" ? "airtime_container" : ""}>
        <div className={PathName === "/cables-sub" ? "container" : ""}>
          <form onSubmit={onSubmitHandler}>
            <div className="row row-cols-md-2 row-cols-sm-1 row-cols-1">
              <div className="col">
                <div className="form-group">
                  <select
                    name="cableType"
                    className="input_field"
                    onChange={changeHandler}
                  >
                    <option value="">Cable Type</option>
                    <option value="GOTV">GOTV</option>
                    <option value="DSTV">DSTV</option>
                    <option value="Startime">STARTIME</option>
                  </select>
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <input
                    type="number"
                    name="iuc"
                    placeholder="IUC/Smart Card Number"
                    className="input_field"
                    onChange={changeHandler}
                  />
                </div>
              </div>

              <div className="col">
                <div className="form-group">
                  <select name="" id="" className="input_field">
                    {cable.map(({ id, name, price }) => (
                      <option key={id}>
                        {name}
                        {price}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* submit button */}
              <div className="col">
                <div className="form-group">
                  <button className="btn_pays">Purchase</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* collect the pin */}
        {confirm && (
          <Confirm
            setConfirm={setConfirm}
            confirm={confirm}
            form={form}
            purchase={purchase}
          />
        )}
      </div>
    </>
  );
}
