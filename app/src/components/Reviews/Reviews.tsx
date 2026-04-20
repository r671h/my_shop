"use client";

import { useState } from "react";
import { useReviews2 } from "../../hooks/useReviews2";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import styles from "./Reviews.module.scss";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

type Props = {
  productId: string;
};

export default function Reviews({ productId }: Props) {
  const { reviews, loading, mutate } = useReviews2(JSON.stringify(productId));
  const { token, user, isLoggedIn } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitting(true);
    setError("");

    try {
      await api.post(
        `/products/${productId}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment("");
      setRating(5);
      mutate(); // ← refresh reviews
    } catch (e: any) {
      setError(e.response?.data?.error || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(reviewId: string) {
    try {
      await api.delete(`/products/${productId}/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      mutate();
    } catch (e: any) {
      console.error("Error deleting review:", e.message);
    }
  }

  const stars = (count: number) => "★".repeat(count) + "☆".repeat(5 - count);

  if (loading) return <p>Loading reviews...</p>;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        Reviews ({reviews.length})
      </h2>

      {/* Review list */}
      {reviews.length === 0 ? (
        <p className={styles.empty}>No reviews yet. Be the first!</p>
      ) : (
        <div className={styles.list}>
          {reviews.map((review) => (
            <div key={review._id} className={styles.review}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewLeft}>
                  <div className={styles.avatar}>{review.userName.charAt(0).toUpperCase()}</div>
                  <div>
                    <p className={styles.reviewName}>{review.userName}</p>
                    <p className={styles.reviewDate}>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className={styles.reviewRight}>
                  <span className={styles.stars}>{stars(review.rating)}</span>
                  {user && review.userId === (user as any).id && (
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(review._id)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
              <p className={styles.reviewComment}>{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add review form */}
      {isLoggedIn ? (
        <div className={styles.form}>
          <h3 className={styles.formTitle}>Write a review</h3>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className={styles.ratingPicker}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`${styles.star} ${star <= rating ? styles.starActive : ""}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              className={styles.textarea}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
              rows={4}
              required
            />
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      ) : (
        <p className={styles.loginPrompt}>
          Please <a href="/pages/auth/login">login</a> to write a review.
        </p>
      )}
    </div>
  );
}