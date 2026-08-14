import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {MediaItem} from '../types';

const {height, width} = Dimensions.get('window');

interface MediaSwipeViewProps {
  currentMedia: MediaItem;
  currentIndex: number;
  totalItems: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onLongPress: () => void;
}

const MediaSwipeView: React.FC<MediaSwipeViewProps> = ({
  currentMedia,
  currentIndex,
  totalItems,
  isPlaying,
  currentTime,
  duration,
  onLongPress,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = (currentTime / duration) * 100;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onLongPress={onLongPress}
      delayLongPress={500}
    >
      <View style={styles.mediaBackground}>
        {currentMedia.type === 'audio' && (
          <View style={styles.audioPlaceholder}>
            <Text style={styles.audioIcon}>🎵</Text>
            <Text style={styles.audioTitle}>{currentMedia.title}</Text>
          </View>
        )}
      </View>

      <View style={styles.overlay}>
        <View style={styles.topInfo}>
          <Text style={styles.title}>{currentMedia.title}</Text>
          <Text style={styles.counter}>
            {currentIndex + 1}/{totalItems}
          </Text>
        </View>

        <View style={styles.bottomInfo}>
          <Text style={styles.timeText}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {width: `${progressPercent}%`},
              ]}
            />
          </View>
          <Text style={styles.hint}>لمبا دبائیں category میں شامل کریں</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
  },
  mediaBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1a1a1a',
  },
  audioPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  audioTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  topInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    marginRight: 10,
  },
  counter: {
    color: '#fff',
    fontSize: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bottomInfo: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    padding: 12,
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
  },
  hint: {
    color: '#aaa',
    fontSize: 11,
    fontStyle: 'italic',
  },
});

export default MediaSwipeView;
