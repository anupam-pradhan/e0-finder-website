import { Mail, AlertTriangle, Smartphone, Trash2 } from 'lucide-react'
import { SitePage, PolicySection, BulletList } from '@/components/site-page'

export const metadata = {
  title: 'Delete Your Account — E0 Finder',
  description: 'Instructions on how to delete your E0 Finder account and associated personal data.',
}

export default function DeleteAccountPage() {
  const steps = [
    'Open the E0 Finder app',
    'Go to Profile → Settings → Privacy & Security',
    'Tap "Delete My Account"',
    'Confirm deletion',
  ]

  const deletedItems = [
    'Your profile information (name, email, photo)',
    'All fuel reports you submitted',
    'Your favourites and notification preferences',
    'Uploaded photos',
  ]

  return (
    <SitePage
      eyebrow="Account management"
      title="Delete Your Account — E0 Finder"
      intro="Follow the steps below to permanently delete your E0 Finder account and all associated data."
    >
      <div className="flex flex-col gap-8">
        {/* In-app deletion steps */}
        <PolicySection title="To delete your account and all associated data:">
          <div className="mt-2 grid gap-3">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-lg border border-border/80 bg-background/50 p-3.5"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {idx + 1}
                </span>
                <span className="font-medium text-foreground">{step}</span>
              </div>
            ))}
          </div>
        </PolicySection>

        {/* What gets deleted */}
        <PolicySection title="What gets deleted:">
          <BulletList items={deletedItems} />
        </PolicySection>

        {/* Warning / Important note */}
        <div className="flex gap-4 rounded-xl border border-destructive/20 bg-destructive/5 p-5 text-foreground">
          <AlertTriangle className="size-5 shrink-0 text-destructive mt-0.5" />
          <div className="text-sm leading-6">
            <p className="font-semibold text-destructive">
              Deletion is permanent and cannot be undone.
            </p>
            <p className="mt-1 text-muted-foreground">
              Data is removed within 24 hours of confirmation.
            </p>
          </div>
        </div>

        {/* Alternative / Access issue section */}
        <PolicySection title="Cannot access the app?">
          <p>
            If you cannot access the app, contact{' '}
            <a
              className="font-semibold text-primary hover:underline"
              href="mailto:support@eofinder.app?subject=Delete%20My%20E0%20Finder%20Account"
            >
              support@eofinder.app
            </a>{' '}
            with the email associated with your account.
          </p>
          <div className="mt-4">
            <a
              href="mailto:support@eofinder.app?subject=Delete%20My%20E0%20Finder%20Account"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Mail size={17} /> Contact Support for Deletion
            </a>
          </div>
        </PolicySection>
      </div>
    </SitePage>
  )
}
