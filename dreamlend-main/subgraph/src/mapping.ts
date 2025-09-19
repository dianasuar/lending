import { Address } from "@graphprotocol/graph-ts";
import {
  LoanOffered, LoanAccepted, LoanRepaid, LoanCancelled, LoanLiquidated
} from "../generated/DreamLend/DreamLend";
import { Account, Loan, Repayment } from "../generated/schema";

function getAccount(addr: Address): Account {
  const id = addr.toHex();
  let a = Account.load(id);
  if (a == null) { a = new Account(id); a.save(); }
  return a as Account;
}

export function handleLoanOffered(e: LoanOffered): void {
  const id = e.params.loanId.toString();
  const loan = new Loan(id);
  loan.lender = getAccount(e.params.lender).id;
  loan.token = e.params.asset;
  loan.principal = e.params.amount;
  loan.collateralToken = e.params.collateralAsset;
  loan.collateralAmount = e.params.collateralAmount;
  loan.aprBps = e.params.aprBps;
  loan.duration = e.params.duration;
  loan.status = "Pending";
  loan.save();
}

export function handleLoanAccepted(e: LoanAccepted): void {
  const loan = Loan.load(e.params.loanId.toString());
  if (!loan) return;
  loan.borrower = getAccount(e.params.borrower).id;
  loan.startTimestamp = e.block.timestamp;
  loan.status = "Accepted";
  loan.save();
}

export function handleLoanRepaid(e: LoanRepaid): void {
  const rid = e.transaction.hash.toHex() + "-" + e.logIndex.toString();
  const r = new Repayment(rid);
  r.loan = e.params.loanId.toString();
  r.payer = getAccount(e.params.payer).id;
  r.amount = e.params.amount;
  r.timestamp = e.block.timestamp;
  r.save();
}

export function handleLoanCancelled(e: LoanCancelled): void {
  const loan = Loan.load(e.params.loanId.toString());
  if (!loan) return;
  loan.status = "Cancelled";
  loan.save();
}

export function handleLoanLiquidated(e: LoanLiquidated): void {
  const loan = Loan.load(e.params.loanId.toString());
  if (!loan) return;
  loan.status = "Liquidated";
  loan.save();
}
