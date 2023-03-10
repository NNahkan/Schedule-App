import { useState } from "react";
import s from "./Schedule.module.css";
import { ACTIONS } from "../../App";

export function Schedule({ state, dispatch }) {
  const [department, setDepartment] = useState("surfers");
  const [preTime, setPreTime] = useState("");
  const [newTime , setNewTime] = useState("");

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
  console.log(state.employees.ali.schedule.monday);
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
                    <>
                      {Object.keys(schedule[day]).length === 0 ? (
                        <td>
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
                        </td>
                      ) : (
                        <>
                          {schedule[day].department === department ? (
                            <td>{schedule[day].shift}</td>
                          ) : (
                            <td>{schedule[day].department}</td>
                          )}
                        </>
                      )}
                    </>
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
				<button onClick={() =>dispatch({type: ACTIONS.TIME, payload:newTime})}>Add new preTime</button>
			</div>
        {state.preShifts.map((shift) => (
          <button onClick={() => setPreTime(shift)}>{shift}</button>
        ))}
      </div>
    </div>
  );
}
