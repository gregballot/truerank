import styles from './LayoutFooter.module.css'

export function LayoutFooter() {
    return (
        <div className={styles.footerContainer}>
            <footer className={styles.footer}>
                <p>
                    © 2025 <strong>truerank.gg</strong> is not endorsed by Riot Games and
                    does not reflect the views or opinions of Riot Games
                    or anyone officially involved in producing or managing
                    League of Legends. League of Legends and Riot Games are
                    trademarks or registered trademarks of Riot Games, Inc.
                    League of Legends © Riot Games, Inc.
                </p>
            </footer>
        </div>
    );
}
