import { doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState, VFC } from "react";
import { firebase } from "store/firebase";
import { useDispatch } from "react-redux";

import { alertActions } from "store/alert/actions";
import s from "./price.module.css";
import loadingIcon from "../../../public/loading.gif";
import { Button } from "react-bootstrap";
import { ModalFC } from "components/common/modal";
import { ModalInner } from "./modal-inner";
import { dispatchWithTimer } from "../../../utils/dispatchWithTimer";

export const Price: VFC = () => {
  const dispatch = useDispatch();

  const [foot, setFoot] = useState<number | string>("");
  const [meter, setMeter] = useState<number | string>("");

  const [footInput, setFootInput] = useState<number | string>("");
  const [meterInput, setMeterInput] = useState<number | string>("");

  const [loading, setLoading] = useState(true);
  const [footModal, setFootModal] = useState(false);
  const [meterModal, setMeterModal] = useState(false);
  const priceRef = doc(firebase.firestore!, "price", "price");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const priceSnap = await getDoc(priceRef);

        setMeter(priceSnap.data()?.meter ?? 0);
        setMeterInput(priceSnap.data()?.meter ?? 0);

        setFoot(priceSnap.data()?.foot ?? 0);
        setFootInput(priceSnap.data()?.foot ?? 0);

        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) {
    return (
      <div className={s.wrapper}>
        <Image width={100} height={100} src={loadingIcon} alt="loading" />
      </div>
    );
  }

  const onHide = () => {
    footModal && setFootInput(foot);
    footModal && setFootModal(false);

    meterModal && setMeterInput(meter);
    meterModal && setMeterModal(false);
  };

  const saveMeterChange = async () => {
    try {
      setLoading(true);
      await updateDoc(priceRef, {
        meter: meterInput,
      });
      setMeter(meterInput);
      setLoading(false);
      dispatchWithTimer(
        () =>
          dispatch(
            alertActions.setSuccessRequested("Meter price was changed!")
          ),
        () => dispatch(alertActions.setSuccessRequested(""))
      );
    } catch {
      setLoading(false);
      dispatchWithTimer(
        () =>
          dispatch(
            alertActions.setErrorRequested("Meter price wasn't changed!")
          ),
        () => dispatch(alertActions.setErrorRequested(""))
      );
    }
  };

  const saveFootChange = async () => {
    try {
      setLoading(true);
      await updateDoc(priceRef, {
        foot: footInput,
      });
      setFoot(footInput);
      setLoading(false);
      dispatchWithTimer(
        () =>
          dispatch(alertActions.setSuccessRequested("Foot price was changed!")),
        () => dispatch(alertActions.setSuccessRequested(""))
      );
    } catch {
      setLoading(false);
      dispatchWithTimer(
        () =>
          dispatch(
            alertActions.setErrorRequested("Foot price wasn't changed!")
          ),
        () => dispatch(alertActions.setErrorRequested(""))
      );
    }
  };

  const onAgree = () => {
    if (footModal) {
      saveFootChange();
      setFootModal(false);
    }
    if (meterModal) {
      saveMeterChange();
      setMeterModal(false);
    }
  };

  const onDecline = () => {
    onHide();
  };

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.info}>
          <div className={s.foot}>
            <div className={s.header}>Foot:</div>
            {foot ? (
              <div className={s.footText}>{foot} USD</div>
            ) : (
              <div className={s.noData}>
                You can add foot price with button below
              </div>
            )}
            <div className={s.footBtn}>
              <Button
                variant="outline-danger"
                onClick={() => setFootModal(true)}
              >
                Change foot price
              </Button>
            </div>
          </div>
          <div className={s.meter}>
            <div className={s.header}>Meter:</div>
            {meter ? (
              <div className={s.meterText}>{meter} USD</div>
            ) : (
              <div className={s.noData}>
                You can add meter price with button below
              </div>
            )}
            <div className={s.meterBtn}>
              <Button
                variant="outline-danger"
                onClick={() => setMeterModal(true)}
              >
                Change meter price
              </Button>
            </div>
          </div>
        </div>
      </div>
      {footModal && (
        <ModalFC
          onHide={onHide}
          show={footModal}
          title="Change foot price"
          onAgree={onAgree}
          onDecline={onDecline}
        >
          <ModalInner price={footInput} onChange={setFootInput} />
        </ModalFC>
      )}
      {meterModal && (
        <ModalFC
          onHide={onHide}
          show={meterModal}
          title="Change meter price"
          onAgree={onAgree}
          onDecline={onDecline}
        >
          <ModalInner price={meterInput} onChange={setMeterInput} />
        </ModalFC>
      )}
    </>
  );
};
