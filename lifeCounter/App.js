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
  const [yearsLived, setYearsLived]     = useState(0);
  const [monthsLived, setMonthsLived]   = useState(0);
  const [daysLived, setDaysLived]       = useState(0);
  const [showLifeTime, setShowLifeTime] = useState(true);
  const [monthsText, setMonthsText]     = useState('meses');

  /**
   * Calculate how many years, months and days a given person has lived
   * @param {*} event 
   * @param {*} selectedDate 
   */
  function calculateLifetime(event, selectedDate) {
    console.log('----------------------------------------');
    selectedDate = new Date('1989-09-02T03:00:00');
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    calculateYears(selectedDate);
    calculateMonths(selectedDate);
    calculateDays(selectedDate);

    setShowLifeTime(true);
  }

  
  function calculateYears(selectedDate) {
    let tempYears = 0;

    tempYears = currentDate.getFullYear() - selectedDate.getFullYear()
    if (currentDate.getMonth() < selectedDate.getMonth()) {
      tempYears--;
    }
    console.log(`tempYears`, tempYears);
    setYearsLived(tempYears);
  }

  function calculateMonths(selectedDate) {
    let tempMonths = 0;

    if (currentDate.getMonth() < selectedDate.getMonth()) {
      tempMonths = (currentDate.getMonth()+1) + (12 - (selectedDate.getMonth()+1));
    } else if (currentDate.getMonth() > selectedDate.getMonth()) {
      tempMonths = currentDate.getMonth() - selectedDate.getMonth();
    } else {
      tempMonths = 0;
    }

    if (currentDate.getDate() < selectedDate.getDate()) {
      tempMonths--;
    }

    console.log(`tempMonths`, tempMonths);
    setMonthsLived(tempMonths);

    if (tempMonths == 1) {
      setMonthsText('mês');
    } else {
      setMonthsText('meses');
    }
  }

  function calculateDays(selectedDate) {
    let tempDays = 0;

    if (currentDate.getDate() > selectedDate.getDate()) {
      tempDays = currentDate.getDate() - selectedDate.getDate();
    } else {
      tempDays = getRemainingDays(selectedDate) + currentDate.getDate();
    }
    console.log(`tempDays`, tempDays);
    setDaysLived(tempDays);
  }

  /**
   * Get the days left until the end of month
   * @param {*} dateInTest 
   */
  function getRemainingDays(dateInTest) {
    let date;
    let time;
    let days;

    date = new Date(dateInTest.getFullYear(), dateInTest.getMonth(), dateInTest.getDate()); 
    time = new Date(date.getTime());
    time.setMonth(date.getMonth() + 1);
    time.setDate(0);
    days = time.getDate() > date.getDate() ? time.getDate() - date.getDate() : 0;

    return days;
  }

  return (
    <Container>
      {showLifeTime == false && 
        <BirthdateSelection>
          <BirthdateLabel>Data de nascimento</BirthdateLabel>
          <DatePickerOuter>
            <DatePicker
              date={new Date()}
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
            <Lifetime>{monthsLived} {monthsText}</Lifetime>
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
