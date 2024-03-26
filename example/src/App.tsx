import {
  Appbar,
  Provider,
  Surface,
  ThemeProvider,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import DateTime from 'react-native-paper-datetime';

function App() {
  const [nightMode, setNightmode] = useState(false);
  const [example1, setExample1] = useState<string | null>(null);

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
            <DateTime
              label={'Example Date'}
              mode={'outlined'}
              value={example1}
              onSubmit={() => {}}
            />
            <View style={styles.spacerStyle} />
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
});

export default App;
