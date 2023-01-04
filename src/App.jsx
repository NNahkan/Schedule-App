import { useReducer, useState } from "react";
import "./App.css";
import { Schedule } from "./Components/Schedule/Schedule";

export const ACTIONS = {
  ADD: "add",
  SHIFT: "person",
  CREATE: "create",
  TIME: "time",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD:
      return {
        ...state,
        count: state.count + 1,
      };
    case ACTIONS.SHIFT:
      return {
        ...state,
        employees: {
          ...state.employees,
          [payload.person]: {
            ...state.employees[payload.person],
            schedule: {
              ...state.employees[payload.person].schedule,
              [payload.day]: {
                department: payload.department,
                shift: payload.shift,
              },
            },
          },
        },
      };
    case ACTIONS.CREATE:
      if (payload === (null || "")) return state;
      if (Object.keys(state.employees).includes(payload)) return state;
      return {
        ...state,
        employees: {
          ...state.employees,
          [payload]: { Monday: "", Tuesday: "", Wednesday: "" },
        },
      };
    case ACTIONS.TIME:
      if (state.preShifts.includes(payload)) {
        return state;
      }
      return {
        ...state,
        preShifts: [...state.preShifts, payload],
      };
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    count: 1,
    locations: {
      surfers: ["ali", "jonathan", "jon", "mike"],
      grizzly: ["ali", "jon", "mike"],
      billy: ["ali", "jonathan", "jon"],
    },
    employees: {
      ali: {
        info: {
          firstName: "ali",
        },
        schedule: {
          monday: {},
          tuesday: {
            department: "surfers",
            shift: "11:00AM - 04:00PM",
          },
          wednesday: {
            department: "billy",
            shift: "07:00AM - 02:00PM",
          },
          thursday: {
            department: "surfers",
            shift: "07:00AM - 02:00PM",
          },
          friday: {
            department: "billy",
            shift: "07:00AM - 02:00PM",
          },
          saturday: {
            department: "surfers",
            shift: "07:00AM - 02:00PM",
          },
          sunday: {
            department: "billy",
            shift: "07:00AM - 02:00PM",
          },
        },
        departments: {
          grizzly: {
            position: "cashier",
            salary: "$10",
          },
          surfers: {
            position: "bartender",
            salary: "$7",
          },
        },
      },
      jonathan: {
        info: {
          firstName: "jonathan",
        },
        schedule: {
          monday: {
            department: "surfers",
            shift: "08:00AM - 04:00PM",
          },
          tuesday: {
            department: "surfers",
            shift: "11:00AM - 04:00PM",
          },
          wednesday: {
            department: "billy",
            shift: "07:00AM - 02:00PM",
          },
          thursday: {
            department: "surfers",
            shift: "07:00AM - 02:00PM",
          },
          friday: {
            department: "surfers",
            shift: "07:00AM - 02:00PM",
          },
          saturday: {
            department: "billy",
            shift: "07:00AM - 02:00PM",
          },
          sunday: {
            department: "surfers",
            shift: "07:00AM - 02:00PM",
          },
        },
        departments: {
          grizzly: {
            position: "cashier",
            salary: "$10",
          },
          surfers: {
            position: "bartender",
            salary: "$7",
          },
        },
      },
      jon: {
        info: {
          firstName: "jon",
        },
        schedule: {
          monday: {
            department: "grizzly",
            shift: "08:00AM - 04:00PM",
          },
          tuesday: {
            department: "surfers",
            shift: "11:00AM - 04:00PM",
          },
          wednesday: {
            department: "surfers",
            shift: "07:00AM - 02:00PM",
          },
          thursday: {
            department: "billy",
            shift: "07:00AM - 02:00PM",
          },
          friday: {
            department: "grizzly",
            shift: "07:00AM - 02:00PM",
          },
          saturday: {
            department: "surfers",
            shift: "07:00AM - 02:00PM",
          },
          sunday: {
            department: "surfers",
            shift: "07:00AM - 02:00PM",
          },
        },
        departments: {
          grizzly: {
            position: "cashier",
            salary: "$10",
          },
          surfers: {
            position: "bartender",
            salary: "$7",
          },
        },
      },
      mike: {
        info: {
          firstName: "mike",
        },
        schedule: {
          monday: {
            department: "surfers",
            shift: "08:00AM - 04:00PM",
          },
          tuesday: {
            department: "grizzly",
            shift: "11:00AM - 04:00PM",
          },
          wednesday: {
            department: "grizzly",
            shift: "07:00AM - 02:00PM",
          },
          thursday: {
            department: "surfers",
            shift: "07:00AM - 02:00PM",
          },
          friday: {
            department: "surfers",
            shift: "07:00AM - 02:00PM",
          },
          saturday: {
            department: "grizzly",
            shift: "07:00AM - 02:00PM",
          },
          sunday: {
            department: "surfers",
            shift: "07:00AM - 02:00PM",
          },
        },
        departments: {
          grizzly: {
            position: "cashier",
            salary: "$10",
          },
          surfer: {
            position: "bartender",
            salary: "$7",
          },
        },
      },
    },
    preShifts: ["8:00AM - 11:00PM", "11:00AM - 9:00PM", "OFF", "N/A"],
  });

  return (
    <div className="App">
      <Schedule state={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
