import "./Dialog.scss";
import "./Button.scss";
import { useState, useEffect } from "react";

function Dialog({ userName, dialogData }) {
  const isByed = JSON.parse(sessionStorage.getItem("isByed"));
  const [bye, setBye] = useState(false);

  useEffect(() => {
    if (isByed && isByed.bye) {
      setBye(true);
    }
  }, []);

  const Bye = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    sessionStorage.setItem("isByed", JSON.stringify({ bye: true }));
    setBye(true);
  };
  return (
    <>
      {!bye && (
        <>
          <section className="startSection" />
          {dialogData.map((dialog, i) => (
            <section className="dialogSection" key={i}>
              <p className="dialog" key={i}>
                {i === 1 ? `${userName}...? 이름도 이상하구만` : dialog}
              </p>
            </section>
          ))}
          <button className="buttonGray" style={{ margin: "25rem 0" }} onClick={Bye}>
            잘 있어 호천아
          </button>
        </>
      )}
    </>
  );
}

export default Dialog;
