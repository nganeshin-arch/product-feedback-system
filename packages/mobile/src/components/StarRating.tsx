import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  readonly?: boolean;
  showNumber?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  size = 24,
  readonly = false,
  showNumber = false,
}) => {
  const stars = [1, 2, 3, 4, 5];

  const handlePress = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {stars.map((star) => {
          const filled = star <= rating;
          const StarComponent = readonly ? View : TouchableOpacity;

          return (
            <StarComponent
              key={star}
              onPress={() => handlePress(star)}
              disabled={readonly}
              style={styles.star}
            >
              <Text style={[styles.starText, { fontSize: size }]}>
                {filled ? '★' : '☆'}
              </Text>
            </StarComponent>
          );
        })}
      </View>
      {showNumber && (
        <Text style={styles.ratingText}>
          {rating.toFixed(1)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    marginRight: spacing.xs / 2,
  },
  starText: {
    color: colors.starFilled,
  },
  ratingText: {
    marginLeft: spacing.sm,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
});
