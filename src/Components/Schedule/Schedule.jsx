import { useEffect, useState } from "react";
import s from "./Schedule.module.css";
import { ACTIONS } from "../../App";

export function Schedule({ state, dispatch }) {
  const [department, setDepartment] = useState("surfers");
  const [preTime, setPreTime] = useState("");
  const [newTime, setNewTime] = useState("");
  const [shift, setShift] = useState(""); // editin shift manually for edit part
  const [dataBase, setDataBase] = useState(null);

  const [field, setField] = useState(false); // kind a Id for edit part

  useEffect(() => {
    async function getData() {
      try {
        await fetch("http://localhost:8000/api/v1/allData", {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => setDataBase(data.data));
      } catch (error) {
        console.error(error.message);
      }
      console.log(dataBase);
    }

    getData("http://localhost:8000/api/v1/allData");
  }, []);

  const handleAdjust = (value, shift) => {
    if (value === field) {
      setField("");
    } else {
      setField(value);
      setShift(shift);
    }
  };

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const locations = state.locations;
  return (
    <div className={s.scheduleWrapper}>
      <div>
        <h1>Count : {state.count}</h1>
        <button onClick={() => dispatch({ type: ACTIONS.ADD })}>Add</button>
        <br />
        <br />
        <div style={{ marginBottom: "5rem" }}>
          {Object.keys(locations).map((location) => (
            <button onClick={() => setDepartment(location)}>
              {location.toUpperCase()}
            </button>
          ))}
        </div>
        <table className={s.scheduleTable}>
          <thead>
            <tr>
              <th></th>
              {days && days.map((day) => <th>{day.toUpperCase()}</th>)}
            </tr>
          </thead>
          <tbody>
            {locations[department].map((employee) => {
              const schedule = state.employees[employee].schedule;
              return (
                <tr>
                  <td>{employee.toUpperCase()}</td>
                  {Object.keys(schedule).map((day) => (
                    <td className={s.shiftWrapper}>
                      {Object.keys(schedule[day]).length === 0 ? (
                        <>
                          <button
                            onClick={() => {
                              dispatch({
                                type: ACTIONS.SHIFT,
                                payload: {
                                  person: employee,
                                  shift: preTime,
                                  day: day,
                                  department: department,
                                },
                              });
                            }}
                          >
                            Apply
                          </button>
                        </>
                      ) : (
                        <>
                          {field === `${employee}${day}` ? (
                            <input
                              value={shift}
                              onChange={(e) => setShift(e.target.value)}
                              type="text"
                            />
                          ) : (
                            <>
                              {schedule[day].department === department ? (
                                <>{schedule[day].shift}</>
                              ) : (
                                <>{schedule[day].department}</>
                              )}
                            </>
                          )}
                          <button
                            onClick={() =>
                              handleAdjust(
                                `${employee}${day}`,
                                schedule[day].department === department
                                  ? schedule[day].shift
                                  : schedule[day].department
                              )
                            }
                            className={s.editButton}
                          >
                            x
                          </button>
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={s.preShiftsWrapper}>
        <input type="time" />

        <div>{preTime}</div>
        <div>
          <input onChange={(e) => setNewTime(e.target.value)} type="text" />
          <button
            onClick={() => dispatch({ type: ACTIONS.TIME, payload: newTime })}
          >
            Add new preTime
          </button>
        </div>
        {state.preShifts.map((shift) => (
          <button onClick={() => setPreTime(shift)}>{shift}</button>
        ))}
      </div>
    </div>
  );
}
