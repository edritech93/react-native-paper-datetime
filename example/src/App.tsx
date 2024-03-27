import React, { Fragment, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  Appbar,
  Provider,
  Surface,
  ThemeProvider,
  MD3DarkTheme,
  MD3LightTheme,
  Button,
} from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DateTimePicker } from './components';
import DateTime from 'react-native-paper-datetime';

type InitialType = {
  dateTime1: string;
  dateTime2: string;
  dateTime3: string;
};

function App() {
  const [nightMode, setNightmode] = useState(false);

  const initialData: InitialType = {
    dateTime1: '',
    dateTime2: '',
    dateTime3: '',
  };

  const validateSchema = Yup.object().shape({
    dateTime1: Yup.string().required(`Date Time 1 is required`),
    dateTime2: Yup.string().required(`Date Time 2 is required`),
    dateTime3: Yup.string().required(`Date Time 3 is required`),
  });

  const _onSubmit = (values: InitialType) => {
    console.log(values);
  };

  return (
    <Provider theme={nightMode ? MD3DarkTheme : MD3LightTheme}>
      <ThemeProvider theme={nightMode ? MD3DarkTheme : MD3LightTheme}>
        <StatusBar
          backgroundColor={
            nightMode
              ? MD3DarkTheme.colors.surface
              : MD3LightTheme.colors.primary
          }
          barStyle={'light-content'}
        />
        <Appbar.Header>
          <Appbar.Content title="React Native Paper DateTime" />
          <Appbar.Action
            icon={nightMode ? 'brightness-7' : 'brightness-3'}
            onPress={() => setNightmode(!nightMode)}
          />
        </Appbar.Header>
        <Surface style={styles.containerStyle}>
          <SafeAreaView style={styles.safeContainerStyle}>
            <Formik
              initialValues={initialData}
              enableReinitialize={true}
              onSubmit={_onSubmit}
              validationSchema={validateSchema}
            >
              {({
                values,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                isValid,
                handleSubmit,
              }) => (
                <Fragment>
                  <KeyboardAvoidingView
                    style={styles.flex1}
                    behavior={'padding'}
                    enabled={Platform.OS === 'ios' ? true : false}
                  >
                    <ScrollView>
                      <DateTime
                        label={'Example 1'}
                        value={values.dateTime1}
                        error={touched.dateTime1 && errors.dateTime1}
                        message={errors.dateTime1}
                        onSubmit={handleChange('dateTime1')}
                        onCancel={() => setFieldTouched('dateTime1')}
                      />
                    </ScrollView>
                  </KeyboardAvoidingView>
                  <Button disabled={!isValid} onPress={handleSubmit as any}>
                    OK
                  </Button>
                </Fragment>
              )}
            </Formik>
          </SafeAreaView>
        </Surface>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  spacerStyle: {
    marginBottom: 15,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
  },
  flex1: {
    flex: 1,
  },
});

export default App;
