import styles from './LayoutFooter.module.css'

export function LayoutFooter() {
    return (
        <div className={styles.footerContainer}>
            <footer className={styles.footer}>
                <p>© 2025 truerank.gg</p>
            </footer>
        </div>
    );
}