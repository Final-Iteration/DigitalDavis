import React, {useState} from "react";
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { SwipeablePanel } from 'rn-swipeable-panel';

import CreateChallengeScreenTags from "./CreateChallengeScreenTags";
import CreateChallengeDescription from "./CreateChallengeDescription";
import CreateChallengeDate from "./CreateChallengeDate";


const { width, height } = Dimensions.get('window');

const CreateChallengeModal = (selectAllTags, emotionalTag, environmentalTag, intellectualTag, physicalTag,socialTag,spiritualTag) => {

    const [panelProps, setPanelProps] = useState({
        fullWidth: true,
        openLarge: true,
        showCloseButton: true,
        onClose: () => closePanel(),
        onPressCloseButton: () => closePanel(),
        // ...or any prop you want
      });
      const [isPanelActive, setIsPanelActive] = useState(false);
    
      const openPanel = () => {
        setIsPanelActive(true);
      };
    
      const closePanel = () => {
        setIsPanelActive(false);
      };

    return (
        <View>
            <Text>
                Challenge Modal Page
            </Text>
            <SwipeablePanel>
                <PanelContent>
                    
                </PanelContent>
            </SwipeablePanel>
        </View>
    );
};

const styles = StyleSheet.create({});

export default CreateChallengeModal;