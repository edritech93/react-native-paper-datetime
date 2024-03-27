import React, {
  type ReactNode,
  forwardRef,
  useEffect,
  useState,
  useCallback,
  Fragment,
} from 'react';
import {
  type TextStyle,
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

type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface DateTimePropsInterface {
  label?: string | undefined;
  placeholder?: string | undefined;
  mode?: 'outlined' | 'flat' | undefined;
  type?: 'date' | 'time' | 'datetime';
  inputProps?: TextInputPropsWithoutTheme;
  value: string | null | undefined;
  theme?: MD3Theme;
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
    const defTheme = useTheme();
    const {
      mode,
      label,
      placeholder,
      inputProps,
      theme = defTheme,
      type = 'date',
      message,
      error,
      errorStyle,
    } = props;
    const [displayValue, setDisplayValue] = useState(new Date());
    const [showDateTime, setShowDateTime] = useState<boolean>(false);

    function _onPressConfirm(date: Date) {
      if (onCancel) {
        onCancel(); //NOTE: trigger setFieldTouched
      }
      setShowDateTime(false);
      onSubmit(String(date));
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
          // date={displayValue ? moment(displayValue).toDate() : new Date()}
          date={displayValue}
          mode={type}
          isVisible={showDateTime}
          onConfirm={(date: Date) => _onPressConfirm(date)}
          onCancel={() => _onPressCancel()}
        />
      );
    }

    return (
      <Fragment>
        <TouchableRipple ref={ref as any} onPress={() => setShowDateTime(true)}>
          <View pointerEvents={'none'}>
            <TextInput
              value={displayValue.toString()}
              mode={mode}
              label={label}
              placeholder={placeholder}
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
      </Fragment>
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
