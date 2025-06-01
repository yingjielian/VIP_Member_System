package com.example.vipmembers.service;

import com.example.vipmembers.model.Member;
import com.example.vipmembers.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MemberService {
    @Autowired
    private MemberRepository memberRepository;

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> getMemberByMemberId(String memberId) {
        return memberRepository.findByMemberId(memberId);
    }

    public Member createMember(Member member) {
        // Always generate a unique memberId for new members
        member.setMemberId(UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        return memberRepository.save(member);
    }

    public Optional<Member> updateMember(String memberId, Member updated) {
        return memberRepository.findByMemberId(memberId).map(existing -> {
            existing.setFullName(updated.getFullName());
            existing.setEmail(updated.getEmail());
            existing.setPhoneNumber(updated.getPhoneNumber());
            existing.setMembershipLevel(updated.getMembershipLevel());
            existing.setJoinDate(updated.getJoinDate());
            existing.setExpirationDate(updated.getExpirationDate());
            existing.setProfilePhotoUrl(updated.getProfilePhotoUrl());
            existing.setNotes(updated.getNotes());
            return memberRepository.save(existing);
        });
    }

    @Transactional
    public void deleteMember(String memberId) {
        memberRepository.deleteByMemberId(memberId);
    }
}
