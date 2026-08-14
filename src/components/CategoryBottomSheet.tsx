import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import {useMediaStore} from '../store/mediaStore';

const {height} = Dimensions.get('window');

interface CategoryBottomSheetProps {
  isVisible: boolean;
  mediaId: string | null;
  onClose: () => void;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryBottomSheet: React.FC<CategoryBottomSheetProps> = ({
  isVisible,
  mediaId,
  onClose,
  onSelectCategory,
}) => {
  const {categories} = useMediaStore();

  const renderCategory = ({item}) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        {borderLeftColor: item.color, borderLeftWidth: 4},
      ]}
      onPress={() => {
        onSelectCategory(item.id);
      }}
    >
      <View style={[styles.categoryDot, {backgroundColor: item.color}]} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.bottomSheet}>
          <View style={styles.handleBar} />

          <Text style={styles.title}>Category میں شامل کریں</Text>

          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>منسوخ کریں</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingBottom: 30,
    maxHeight: height * 0.7,
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: '#444',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    marginBottom: 8,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  closeButton: {
    marginTop: 16,
    marginHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CategoryBottomSheet;
