import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrevious} style={styles.button}>
        <Text style={styles.buttonText}>⬆️</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onPlayPause} style={styles.playButton}>
        <Text style={styles.playButtonText}>{isPlaying ? '⏸' : '▶️'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onNext} style={styles.button}>
        <Text style={styles.buttonText}>⬇️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    gap: 20,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    fontSize: 32,
  },
});

export default PlayerControls;
