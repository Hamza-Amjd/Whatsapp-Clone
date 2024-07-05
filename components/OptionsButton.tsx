import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
type optionbuttonProps = {
  options: any;
};
const OptionsButton: React.FC<optionbuttonProps> = ({ options }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setShowOptions(true)}>
        <Ionicons name="ellipsis-vertical" size={25} color={Colors.muted} />
      </TouchableOpacity>
      <Modal transparent visible={showOptions}>
        <SafeAreaView
          style={{ flex: 1 }}
          onTouchEnd={() => setShowOptions(false)}
        >
          <View style={styles.popup}>
            {options.map((op: any) => {
              return (
                <TouchableOpacity key={op.name} onPress={op.function}>
                  <Text style={styles.btnTxt}>
                    {op.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default OptionsButton;

const styles = StyleSheet.create({
  popup: {
    backgroundColor: "#d8dee3",
    padding: 15,
    borderRadius: 10,
    top: 50,
    right: 25,
    alignSelf: "flex-end",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btnTxt:{
    fontSize: 16,
    fontWeight: "600",
    paddingRight: 40,
  }
});
