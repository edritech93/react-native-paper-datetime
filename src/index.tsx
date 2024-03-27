import React, { forwardRef, useState } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  type ViewStyle,
  StyleSheet,
  type StyleProp,
} from 'react-native';
import {
  TextInput,
  TouchableRipple,
  useTheme,
  type TextInputProps,
  type MD3Theme,
  HelperText,
} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface DateTimePropsInterface {
  label?: string | undefined;
  placeholder?: string | undefined;
  mode?: 'outlined' | 'flat' | undefined;
  type: 'date' | 'time' | 'datetime';
  format: string;
  inputProps?: TextInputPropsWithoutTheme;
  theme?: MD3Theme;
  value: string;
  message?: string;
  error?: any;
  containerStyle?: StyleProp<ViewStyle>;
  errorStyle?: StyleProp<ViewStyle>;
  onSubmit: (args: string) => void;
  onCancel?: () => void;
}

type TextInputPropsWithoutTheme = Without<TextInputProps, 'theme'>;

const DateTime = forwardRef<TouchableWithoutFeedback, DateTimePropsInterface>(
  (props, ref) => {
    const themeDefault = useTheme();
    const {
      label,
      placeholder,
      mode,
      type,
      format,
      inputProps,
      theme = themeDefault,
      value,
      message,
      error,
      containerStyle,
      errorStyle,
      onSubmit,
      onCancel,
    } = props;

    const [showDateTime, setShowDateTime] = useState<boolean>(false);

    function getValue() {
      return moment(value).format(format).toString();
    }

    function _onPressConfirm(date: Date) {
      setShowDateTime(false);
      if (onCancel) {
        onCancel(); //NOTE: trigger setFieldTouched
      }
      onSubmit(date.toISOString());
    }

    function _onPressCancel() {
      setShowDateTime(false);
      if (onCancel) {
        onCancel(); //NOTE: trigger setFieldTouched
      }
    }

    function _renderModalDatePicker() {
      return (
        <DateTimePickerModal
          date={value ? moment(value).toDate() : new Date()}
          mode={type}
          isVisible={showDateTime}
          onConfirm={(date: Date) => _onPressConfirm(date)}
          onCancel={() => _onPressCancel()}
        />
      );
    }

    return (
      <View style={containerStyle}>
        <TouchableRipple ref={ref as any} onPress={() => setShowDateTime(true)}>
          <View pointerEvents={'none'}>
            <TextInput
              label={label}
              mode={mode}
              placeholder={placeholder}
              value={value ? getValue() : ''}
              pointerEvents={'none'}
              theme={theme}
              right={<TextInput.Icon icon={'calendar'} />}
              {...inputProps}
            />
          </View>
        </TouchableRipple>
        {error && (
          <HelperText
            type={'error'}
            visible={true}
            style={[styles.wrapError, errorStyle]}
          >
            {message}
          </HelperText>
        )}
        {_renderModalDatePicker()}
      </View>
    );
  }
);

export default DateTime;

const styles = StyleSheet.create({
  wrapError: {
    marginTop: -4,
  },
  flex1: {
    flex: 1,
  },
});
