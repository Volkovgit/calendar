import "./App.css";
import { yearsWithMounth } from "./getYears";
import { useState } from "react";
import {
  Container,
  Grid,
  Button,
  Typography,
  Box,
  TextField,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  dataItem: {
    display: "inline-block",
    width: "65px",
  },
  dataBtn: {
    margin: "1px",
    borderRadius: "0",
  },
  dataGrid: {
    // width: "270px",
    // border: "1px solid black",
  },
  noteBlock: {
    // height: "300px",
    // border: "1px solid black",
  },
});

function App() {
  const classes = useStyles();

  const [currentMonth, setcurrentMonth] = useState(0);

  const allYears = yearsWithMounth;

  const [yearIndex, setYearIndex] = useState(0);
  const [currentYear, setCurrentYear] = useState(allYears[yearIndex]);
  const [noteByCurrentDay, setNoteByCurrentDay] = useState([]);
  const [currentDay, setCurrentDay] = useState(0);
  const [textInput, setTextInput] = useState("");

  const nextMonth = () => {
    let curM = currentMonth + 1;
    if (curM == 12) curM = 0;
    setcurrentMonth(curM);
    setNoteByCurrentDay([]);
    setCurrentDay(0);
  };

  const prevMonth = () => {
    let curM = currentMonth - 1;
    if (curM < 0) curM = 11;
    setcurrentMonth(curM);
    setNoteByCurrentDay([]);
    setCurrentDay(0);
  };

  const nextYear = () => {
    let newYear = yearIndex + 1;
    if (allYears[newYear] === undefined) {
      setYearIndex(0);
      newYear = 0;
      setCurrentYear(allYears[newYear]);
    } else {
      setYearIndex(newYear);
      setCurrentYear(allYears[newYear]);
    }
    setNoteByCurrentDay([]);
    setCurrentDay(0);
  };

  const prevYear = () => {
    console.log(yearIndex);
    let newYear = yearIndex - 1;
    if (newYear < 0) newYear = allYears.length - 1;
    if (allYears[newYear] === undefined) {
      setYearIndex(allYears.length);
      setCurrentYear(allYears[newYear]);
    } else {
      setYearIndex(newYear);
      setCurrentYear(allYears[newYear]);
    }
    setNoteByCurrentDay([]);
    setCurrentDay(0);
  };

  const getNoteByDay = (dayNumber) => {
    setCurrentDay(dayNumber);
    let noteArr = currentYear.monthInYear[currentMonth].days.find(
      (d) => d.day == dayNumber
    ).note;
    setNoteByCurrentDay([...noteArr]);
  };

  const addNote = () => {
    debugger;
    if (currentDay !== 0 && textInput) {
      currentYear.monthInYear[currentMonth].days
        .find((d) => d.day == currentDay)
        .note.push(textInput);
      setNoteByCurrentDay([
        ...currentYear.monthInYear[currentMonth].days.find(
          (d) => d.day == currentDay
        ).note,
      ]); 
    }
  };

  const deleteNote = (index) => {
    currentYear.monthInYear[currentMonth].days
        .find((d) => d.day == currentDay)
        .note.splice(index,1);
    setNoteByCurrentDay([...currentYear.monthInYear[currentMonth].days.find(
      (d) => d.day == currentDay
    ).note]);

  };

  return (
    <Container>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        <Button variant="contained" color="primary" onClick={prevYear}>
          {"<"}
        </Button>

        <Typography variant="h4">{currentYear.year}</Typography>

        <Button variant="contained" color="primary" onClick={nextYear}>
          {">"}
        </Button>
      </Grid>
      <div>
        {currentYear.monthInYear.map((m, i) => {
          if (i === currentMonth) {
            return (
              <div key={i}>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={prevMonth}
                  >
                    {"<"}
                  </Button>
                  <Typography variant="h4">{m.month}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={nextMonth}
                  >
                    {">"}
                  </Button>
                </Grid>
                <Grid container justify="center">
                  <Grid item xs={4} className={classes.noteBlock}>
                    {m.days.map((d, dIndex) => {
                      return (
                        <Box xs={8} key={dIndex} className={classes.dataItem}>
                          <Button
                            className={classes.dataBtn}
                            variant="contained"
                            onClick={() => getNoteByDay(d.day)}
                          >
                            {d.day}
                          </Button>
                        </Box>
                      );
                    })}
                  </Grid>
                  <Grid item xs={6} className={classes.noteBlock}>
                    <TextField
                      onChange={(e) => setTextInput(e.target.value)}
                    ></TextField>
                    <Button
                      onClick={() => addNote()}
                      variant="contained"
                      color="primary"
                    >
                      Add Note
                    </Button>
                    <Box>
                      Day:{currentDay != 0 ? currentDay : "Выберите день"}
                    </Box>

                    {noteByCurrentDay.map((n, i) => {
                      return (
                        <Box key={i}>
                          {n}
                          <IconButton
                            aria-label="delete"
                            className={classes.margin}
                            onClick={() => deleteNote(i)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      );
                    })}
                  </Grid>
                </Grid>
              </div>
            );
          }
        })}
      </div>
    </Container>
  );
}

export default App;
