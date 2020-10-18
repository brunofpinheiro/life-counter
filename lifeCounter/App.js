import React, { useState } from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {Container,
        Lifetime,
        BirthdateLabel,
        BirthdateSelection,
        DatePickerOuter,
        LifetimeOuter,
        ReturnButton,
        ReturnButtonText,
        YourAgeLabel} from './styles';

export const App = () => {
  let currentDate = new Date();
  const [birthdate, setBirthdate]       = useState(new Date());
  const [yearsLived, setYearsLived]     = useState(0);
  const [monthsLived, setMonthsLived]   = useState(0);
  const [daysLived, setDaysLived]       = useState(0);
  const [showLifeTime, setShowLifeTime] = useState(true);

  function calculateLifetime(event, selectedDate) {
    let tempYears  = 0;
    let tempMonths = 0;
    let tempDays   = 0;

    console.log('----------------------------------------');
    selectedDate = new Date('1989-09-02T03:00:00');
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    // Calculate years
    tempYears = currentDate.getFullYear() - selectedDate.getFullYear()
    if (currentDate.getMonth() < selectedDate.getMonth()) {
      tempYears--;
    }
    console.log(`tempYears`, tempYears);
    setYearsLived(tempYears);

    // Calculate months
    if (currentDate.getMonth() < selectedDate.getMonth()) {
      tempMonths = (currentDate.getMonth()+1) + (12 - (selectedDate.getMonth()+1));
    } else if (currentDate.getMonth() > selectedDate.getMonth()) {
      tempMonths = currentDate.getMonth() - selectedDate.getMonth();
    } else {
      tempMonths = 0;
    }
    console.log(`tempMonths`, tempMonths);
    setMonthsLived(tempMonths);

    // Calculate days
    tempDays = currentDate.getDate();
    console.log(`tempDays`, tempDays);
    setDaysLived(tempDays);

    setShowLifeTime(true);
  }

  return (
    <Container>
      {showLifeTime == false && 
        <BirthdateSelection>
          <BirthdateLabel>Data de nascimento</BirthdateLabel>
          <DatePickerOuter>
            <DatePicker
            date={birthdate}
            androidMode="spinner"
            format="DD-MM-YYYY"
            minDate="01-01-1900"
            onDateChange={(event, date) => calculateLifetime(event, date)}
            customStyles={{
              dateTouchBody: {
                fontSize: 26,
                width: 200,
              },
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36,
                borderColor: '#2d6187',
                // borderWidth: 0,
              },
              dateText: {
                color: '#2d6187',
                fontSize: 24,
              }
            }}
            />
          </DatePickerOuter>
        </BirthdateSelection>
      }  

      {showLifeTime && 
        <View style={{flex: 1}}>
          <LifetimeOuter>
            <YourAgeLabel>Você tem</YourAgeLabel>
            <Lifetime>{yearsLived} anos</Lifetime>
            <Lifetime>{monthsLived} meses</Lifetime>
            <Lifetime>{daysLived} dias</Lifetime>
          </LifetimeOuter>

          <ReturnButton onPress={() => setShowLifeTime(false)}>
            <ReturnButtonText>Voltar</ReturnButtonText>
          </ReturnButton>
        </View>
      }
    </Container>
  );
}

export default App;
