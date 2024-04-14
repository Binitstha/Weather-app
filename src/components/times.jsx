// import { useState } from "react";
import { PropTypes } from "prop-types";
export const Times = ({ location }) => {
  const date = new Date();
  //   const time = `${date.getFullYear()}-${
  //     date.getMonth() + 1
  //   }-${date.getDate()}T${date.getHours()}:${
  //     date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  //   }:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}`;

  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const hour = date.getHours() > 12 ? date.getHours() % 12 : date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    <>
      <div className="h-56 w-72 rounded-xl mx-20 m-10 flex flex-col justify-center items-center shadow-xl bg-slate-600 p-3">
        <div>{location}</div>
        <div>
          {hour <= 10 ? `0${hour}`:hour}:{minute <= 10 ? `0${minute}`:minute}:{second <= 10 ? `0${second}`: second} {date.getHours() >= 12 ? "PM" : "AM"}
        </div>
        <div>
          {days[date.getDay() + 1]},{date.getDate()}{" "}
          {months[date.getMonth() + 1]}
        </div>
      </div>
    </>
  );
};
Times.propTypes = {
  location: PropTypes.string.isRequired,
};
