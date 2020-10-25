import React, { useState } from 'react';
import {View, Image} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Container,
        Lifetime,
        BirthdateLabel,
        BirthdateSelection,
        LifetimeOuter,
        ReturnButton,
        ButtonText,
        YourAgeLabel,
        CalculateButton,
        Logo} from './styles';

export const App = () => {
  let currentDate = new Date();
  const [yearsLived, setYearsLived]     = useState(0);
  const [monthsLived, setMonthsLived]   = useState(0);
  const [daysLived, setDaysLived]       = useState(0);
  const [showLifeTime, setShowLifeTime] = useState(false);
  const [monthsText, setMonthsText]     = useState('meses');
  const [selectedDate, setSelectedDate] = useState(new Date());

  /**
   * Calculate how many years, months and days a given person has lived
   * @param {*} event 
   * @param {*} selectedDate 
   */
  function calculateLifetime() {
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
          <Logo source={require('./assets/hourglass-icon.png')} />
          <BirthdateLabel>Data de nascimento</BirthdateLabel>
            <DatePicker
              date={selectedDate}
              mode='date'
              androidVariant='nativeAndroid'
              onDateChange={(date) => setSelectedDate(date)}
            />
            <CalculateButton onPress={() => calculateLifetime()}>
              <ButtonText>Calcular</ButtonText>
            </CalculateButton>
        </BirthdateSelection>
      }  

      {showLifeTime && 
        <View style={{flex: 1}}>
          <LifetimeOuter>
            <YourAgeLabel>Sua idade é de</YourAgeLabel>
            <Lifetime>{yearsLived} anos</Lifetime>
            <Lifetime>{monthsLived} {monthsText}</Lifetime>
            <Lifetime>{daysLived} dias</Lifetime>
          </LifetimeOuter>

          <ReturnButton onPress={() => setShowLifeTime(false)}>
            <ButtonText>Voltar</ButtonText>
          </ReturnButton>
        </View>
      }
    </Container>
  );
}

export default App;
