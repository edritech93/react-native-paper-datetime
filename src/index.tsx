import React, {
  type ReactNode,
  forwardRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  type TextStyle,
  TouchableWithoutFeedback,
  View,
  type ViewStyle,
  StyleSheet,
} from 'react-native';
import {
  TextInput,
  TouchableRipple,
  useTheme,
  type TextInputProps,
  type MD3Theme,
} from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Without<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface DateTimePropsInterface {
  value: string | null | undefined;
  label?: string | undefined;
  placeholder?: string | undefined;
  mode?: 'outlined' | 'flat' | undefined;
  inputProps?: TextInputPropsWithoutTheme;
  type?: 'date' | 'time' | 'datetime';
  //
  dropDownContainerMaxHeight?: number;
  dropDownContainerHeight?: number;
  activeColor?: string;
  theme?: MD3Theme;
  dropDownStyle?: ViewStyle;
  dropDownItemSelectedTextStyle?: TextStyle;
  dropDownItemSelectedStyle?: ViewStyle;
  dropDownItemStyle?: ViewStyle;
  dropDownItemTextStyle?: TextStyle;
  accessibilityLabel?: string;
  //
  onSubmit: (args: string) => void;
  onCancel?: () => void;
}

type TextInputPropsWithoutTheme = Without<TextInputProps, 'theme'>;

const DateTime = forwardRef<TouchableWithoutFeedback, DateTimePropsInterface>(
  (props, ref) => {
    const defTheme = useTheme();
    const {
      multiSelect = false,
      visible,
      onDismiss,
      showDropDown,
      value,
      setValue,
      activeColor,
      mode,
      label,
      placeholder,
      inputProps,
      list,
      theme = defTheme,
      accessibilityLabel,

      type = 'date',
    } = props;
    const [displayValue, setDisplayValue] = useState('');
    const [showDateTime, setShowDateTime] = useState<boolean>(false);

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
      <TouchableRipple
        ref={ref as any}
        onPress={() => setShowDateTime((e: boolean) => !e)}
        // accessibilityLabel={accessibilityLabel}
      >
        <View pointerEvents={'none'}>
          <TextInput
            value={displayValue}
            mode={mode}
            label={label}
            placeholder={placeholder}
            pointerEvents={'none'}
            theme={theme}
            right={<TextInput.Icon icon={'calendar'} />}
            {...inputProps}
          />
        </View>
        {_renderModalDatePicker()}
      </TouchableRipple>
    );
  }
);

export default DateTime;

const styles = StyleSheet.create({
  wrapSearch: {
    marginHorizontal: 16,
  },
  itemRipple: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
});
