import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
  Text,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import {useMediaStore} from '../store/mediaStore';
import MediaSwipeView from '../components/MediaSwipeView';
import CategoryBottomSheet from '../components/CategoryBottomSheet';
import PlayerControls from '../components/PlayerControls';

const {height, width} = Dimensions.get('window');

const PlayerScreen = () => {
  const {mediaItems, currentIndex, setCurrentIndex, addToCategory} =
    useMediaStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState<string | null>(null);

  const panY = useRef(new Animated.Value(0)).current;
  const videoRef = useRef<any>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (evt, gestureState) => {
        const {dy} = gestureState;
        const threshold = 50;

        if (dy < -threshold && currentIndex < mediaItems.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setIsPlaying(true);
        } else if (dy > threshold && currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
          setIsPlaying(true);
        }

        Animated.spring(panY, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  if (!mediaItems || mediaItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>کوئی میڈیا فائل نہیں</Text>
        <Text style={styles.emptySubText}>شروع کرنے کے لیے فائلیں شامل کریں</Text>
      </View>
    );
  }

  const currentMedia = mediaItems[currentIndex];

  const handleLongPress = () => {
    setSelectedMediaId(currentMedia.id);
    setShowCategorySheet(true);
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Animated.View
        style={[
          styles.swipeContainer,
          {
            transform: [{translateY: panY}],
          },
        ]}
      >
        <MediaSwipeView
          currentMedia={currentMedia}
          currentIndex={currentIndex}
          totalItems={mediaItems.length}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          onLongPress={handleLongPress}
        />

        <PlayerControls
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onNext={() => {
            if (currentIndex < mediaItems.length - 1) {
              setCurrentIndex(currentIndex + 1);
            }
          }}
          onPrevious={() => {
            if (currentIndex > 0) {
              setCurrentIndex(currentIndex - 1);
            }
          }}
        />
      </Animated.View>

      {currentMedia.type === 'video' && (
        <Video
          ref={videoRef}
          source={{uri: currentMedia.path}}
          style={styles.video}
          paused={!isPlaying}
          onLoad={(data) => setDuration(data.duration)}
          onProgress={(data) => setCurrentTime(data.currentTime)}
          resizeMode="cover"
          controls={false}
        />
      )}

      <CategoryBottomSheet
        isVisible={showCategorySheet}
        mediaId={selectedMediaId}
        onClose={() => setShowCategorySheet(false)}
        onSelectCategory={(categoryId) => {
          if (selectedMediaId) {
            addToCategory(selectedMediaId, categoryId);
          }
          setShowCategorySheet(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  swipeContainer: {
    flex: 1,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 16,
    color: '#aaa',
  },
});

export default PlayerScreen;
