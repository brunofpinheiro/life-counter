import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-datepicker';

export const App = () => {
  let currentDate = new Date();
  const [birthdate, setBirthdate]     = useState(new Date());
  const [yearsLived, setYearsLived]   = useState(0);
  const [monthsLived, setMonthsLived] = useState(0);
  let daysLived = 0;

  function calculateLifetime(event, selectedDate) {
    let tempYears  = 0;
    let tempMonths = 0;
    let tempDays   = 0;

    console.log('----------------------------------------');
    selectedDate = new Date('1989-09-02T03:00:00');
    // console.log('data fixa >>>>>>>', selectedDate);
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    // Calculate years
    tempYears = currentDate.getFullYear() - selectedDate.getFullYear()
    if (currentDate.getMonth() < selectedDate.getMonth()) {
      tempYears--;
    }
    console.log('tempYears:', tempYears);
    setYearsLived(tempYears);

    // Calculate months
    if (currentDate.getMonth() < selectedDate.getMonth()) {
      tempMonths = (currentDate.getMonth()+1) + (12 - (selectedDate.getMonth()+1));
    } else if (currentDate.getMonth() > selectedDate.getMonth()) {
      tempMonths = currentDate.getMonth() - selectedDate.getMonth();
    } else {
      tempMonths = 0;
    }
    console.log('tempMonths: ' + tempMonths);
    setMonthsLived(tempMonths);

    // Calculate days
  }

  return (
    <Container>
      <DatePicker 
        date={birthdate}
        androidMode="spinner"
        format="DD-MM-YYYY"
        minDate="01-01-1900"
        onDateChange={(event, date) => calculateLifetime(event, date)}
      />
      {/* <DatePicker
        value={birthdate}
        display="spinner"
        style={styles.datepicker}
        onChange={(event, date) => calculateLifetime(event, date)}
        minimumDate={new Date(1900, 0, 1)}
        maximumDate={new Date()}
        dateFormat="dayofweek day month"
      /> */}

      <Text style={styles.lifeTime}>{yearsLived} anos</Text>
      <Text style={styles.lifeTime}>{monthsLived} meses</Text>
      <Text style={styles.lifeTime}>{daysLived} dias</Text>
    </Container>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000066',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lifeTime: {
    color: '#fff',
    fontSize: 24,
  },
  datepicker: {
    width: 200,
    color: '#fff',
  }
});
