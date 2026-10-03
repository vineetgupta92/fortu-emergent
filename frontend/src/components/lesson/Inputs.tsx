// Lesson input controls: free-text field, 1–5 scale and the tap-to-sort category chips.
import { Pressable, Text, TextInput, View } from "react-native";

import { fonts, makeStyles, radius, type, useTheme } from "../../theme";

export function WriteField({
  label,
  placeholder,
  value,
  onChange,
  testID,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  testID: string;
}) {
  const styles = useStyles();
  const { colors } = useTheme();
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        testID={testID}
        accessibilityLabel={label}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.secondary}
        multiline
        style={styles.input}
      />
    </View>
  );
}

export function Scale({
  label,
  value,
  onChange,
  testID,
}: {
  label: string;
  value: number | undefined;
  onChange: (v: number) => void;
  testID: string;
}) {
  const styles = useStyles();
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.scaleRow} accessibilityRole="radiogroup" accessibilityLabel={label}>
        {[1, 2, 3, 4, 5].map((n) => {
          const on = value === n;
          return (
            <Pressable
              key={n}
              testID={`${testID}-${n}`}
              accessibilityRole="radio"
              accessibilityState={{ checked: on }}
              accessibilityLabel={`${n}`}
              onPress={() => onChange(n)}
              style={({ pressed }) => [styles.scaleDot, on && styles.scaleDotOn, pressed && !on && styles.chipPressed]}
            >
              <Text style={[styles.scaleText, on && styles.scaleTextOn]}>{n}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const useStyles = makeStyles((c) => ({
  fieldWrap: { gap: 8 },
  fieldLabel: { ...type.label, fontSize: 15, color: c.text },
  input: {
    minHeight: 88,
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: radius.input,
    padding: 16,
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
    color: c.text,
    backgroundColor: c.white,
    textAlignVertical: "top",
  },
  scaleRow: { flexDirection: "row", gap: 10 },
  scaleDot: {
    width: 52,
    height: 52,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: c.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: c.white,
  },
  scaleDotOn: { backgroundColor: c.mint, borderColor: c.mint },
  scaleText: { fontFamily: fonts.semibold, fontSize: 16, color: c.secondary },
  scaleTextOn: { color: c.mintText },
  chip: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.fSurface,
  },
  chipPressed: { backgroundColor: c.border },
}));
