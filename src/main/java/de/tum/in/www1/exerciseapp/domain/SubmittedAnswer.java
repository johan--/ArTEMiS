package de.tum.in.www1.exerciseapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A SubmittedAnswer.
 */
@Entity
@Table(name = "submitted_answer")
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(
    name="discriminator",
    discriminatorType=DiscriminatorType.STRING
)
@DiscriminatorValue(value="S")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public abstract class SubmittedAnswer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private QuizSubmission submission;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public QuizSubmission getSubmission() {
        return submission;
    }

    public SubmittedAnswer submission(QuizSubmission quizSubmission) {
        this.submission = quizSubmission;
        return this;
    }

    public void setSubmission(QuizSubmission quizSubmission) {
        this.submission = quizSubmission;
    }
    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SubmittedAnswer submittedAnswer = (SubmittedAnswer) o;
        if (submittedAnswer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), submittedAnswer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubmittedAnswer{" +
            "id=" + getId() +
            "}";
    }
}
